import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { BiHelpCircle } from "react-icons/bi";
import "./ElementAdder.css";
import elementData from "./elementData";
import EditorCardUnLogged from "../EditorCardUnlogged/EditorCardUnlogged";
import LoginModal from "../Navbar/LoginModal";
import RegistrationModal from "../Navbar/RegistrationModal";
import { useColorMode, Button, Box, Link } from "@chakra-ui/react";
import downloadIcon from "../../MediaFiles/downloadIcon.png";
import PublishModal from "../PublishModal/PublishModal";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const help = {
  name: "help",
  keyCommand: "help",
  buttonProps: { "aria-label": "Insert help" },
  icon: (
    <svg viewBox="0 0 16 16" width="12px" height="12px">
      <BiHelpCircle />
    </svg>
  ),
  execute: () => {
    window.open("/documentation", "_blank");
  },
};

export default function ElementAdder() {
  const initialMkdStr = "*LOGIN TO USE DIRECT TEMPLATES*";
  const [value, setValue] = useState(initialMkdStr);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedElements, setSelectedElements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState(elementData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isChangeMode, setChangeMode] = useState(false);
  const [name, setName] = useState("");
  const API_URL = process.env.REACT_APP_BACKEND_API;
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const { colorMode, toggleColorMode } = useColorMode();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchGemini = async () => {
    if (!query.trim()) return;

    setLoading(true);


    try {
      const response = await fetch(`${API_URL}/generate/generate-readme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.text();

      if (data && response.ok) {
        setValue('');
        setValue(data);
        setQuery('');
        toast.success("Markdown! Generated", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Failed to Generate markdown!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
    } finally {
      setLoading(false);
    }
  };




  // code for onclick adder button 
  const location = useLocation();
  const { projectId, markdown } = location.state || {}; // Extract the markdown state

  useEffect(() => {
    if (markdown) {
      setValue(markdown)
    }
  }, [markdown]);



  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleRegistrationOpen = () => setIsRegistrationOpen(true);
  const handleRegistrationClose = () => setIsRegistrationOpen(false);

  const navigate = useNavigate();
  const goTempCompoPage = () => {
    navigate("/templatecompo");
  };

  const handleSetChangeMode = (mode) => {
    setChangeMode(mode);
    if (mode) {
      handleRegistrationOpen();
    } else {
      handleLoginOpen();
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredElements(elementData);
    } else {
      const filtered = elementData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredElements(filtered);
    }
  }, [searchQuery]);

  const toggleAddRemove = (index, code) => {
    const normalizedCode = code.trim();
    if (selectedElements.includes(index)) {
      setSelectedElements((prevSelected) =>
        prevSelected.filter((selected) => selected !== index)
      );
      setValue((prevValue) => {
        const escapedCode = normalizedCode.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const pattern = new RegExp(`(^|\\n)${escapedCode}($|\\n)`, "g");
        return prevValue.replace(pattern, "").trim();
      });
    } else {
      setSelectedElements((prevSelected) => [...prevSelected, index]);
      setValue((prevValue) => {
        const updatedValue = prevValue.trim();
        return updatedValue
          ? `${updatedValue}\n\n${normalizedCode}`
          : normalizedCode;
      });
    }
    setHasUnsavedChanges(true);
  };

  const isElementSelected = (index) => selectedElements.includes(index);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBeforeUnload = (event) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleReset = () => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to reset?"
        )
      ) {
        setValue(initialMkdStr);
        setHasUnsavedChanges(false);
      }
    } else {
      setValue(initialMkdStr);
    }
  };
  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update authentication state on successful login
    localStorage.setItem("authToken", "yourAuthToken"); // Replace with actual token logic
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Update authentication state on logout
    localStorage.removeItem("authToken");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ReadMeMaker.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const replaceHeightWithWidth = (inputText) => {
    return inputText.replace(
      /<img\s+([^>]*)height="(\d+)"([^>]*)>/gi,
      (match, p1, height, p2) => {
        return `<img ${p1} width="${height}" ${p2}>`;
      }
    );
  };

  const handleValueChange = (v) => {
    const transformedText = replaceHeightWithWidth(v);
    setValue(transformedText);
    setHasUnsavedChanges(true);
  };

  return (
    <>
      <div
        className={`flex flex-col overflow-hidden md:flex-row mx-2 md:mx-10 mt-32 md:mt-34 ${colorMode === "dark" ? "bg-gray-900" : "bg-white"
          }`}
      >
        <div className="editorHeading">
          <span> ReadMeMaker Ultimate Editor </span>
        </div>
        <div
          className={`md:w-1/3 p-2 md:p-4 ${colorMode === "dark"
            ? "bg-gray-800 border-gray-600"
            : "bg-slate-50 border-info"
            } border rounded-3xl mb-8 md:mb-0`}
        >
          <h4
            className={`text-shadow text-2xl font-medium leading-tight ${colorMode === "dark" ? "text-white" : "text-primary"
              } mb-4`}
          >
            Shortcuts to Stardom: Ready-Made Readme Sections
          </h4>
          <div className="flex items-center w-full mb-4">
            <input
              className={`border-2 w-full ${colorMode === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white"
                } h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`}
              type="search"
              name="search"
              placeholder="Search Elements"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto">
            {filteredElements.map((item, index) => (
              <div
                key={item.slno}
                className={`group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 ${colorMode === "dark"
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-blue-100"
                  }`}
              >
                <div
                  className={`flex h-12 w-12 items-center rounded-lg ${colorMode === "dark"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-200 text-black"
                    } group-hover:bg-blue-200`}
                >
                  <span
                    className={`tag w-full text-center text-2xl font-medium ${colorMode === "dark" ? "text-gray-300" : "text-gray-700"
                      } group-hover:text-blue-900`}
                  >
                    {item.slno}
                  </span>
                </div>
                <div
                  className={`flex flex-col items-start justify-between font-light ${colorMode === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  <p
                    className={`text-xl font-medium ${colorMode === "dark" ? "text-white" : "text-black"
                      }`}
                  >
                    {item.title}
                  </p>
                  <span className="text-xs font-light">{item.desc}</span>
                </div>
                <div className="flex-grow"></div>
                <button
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${isElementSelected(index)
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-300 hover:bg-blue-400"
                    }`}
                  onClick={() => toggleAddRemove(index, item.code)}
                >
                  {isElementSelected(index) ? (
                    <AiFillCheckCircle className="text-3xl mx-2" />
                  ) : (
                    <AiFillPlusCircle className="text-3xl mx-2" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Right Panel - Markdown Editor */}
        <div
          className={`md:w-2/3 p-4 md:p-4 ml-0 md:ml-4 ${colorMode === "dark"
            ? "bg-gray-800 border-gray-600"
            : "bg-white border-gray-300"
            } border rounded-3xl relative`}
        >
          {/* AI README Generator Search Bar */}
          {/* <div className="mt-2 mb-0 flex justify-center items-center">
            <div className="relative w-full max-w-[680px]">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradientSpin opacity-80 blur-sm"></div>

              
              <div
                className={`relative z-10 flex items-center rounded-xl px-4 py-2 shadow-md space-x-2 ${colorMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              >
                <input
                  type="text"
                  placeholder="Let AI assist you with your ideas"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`flex-1 outline-none text-base bg-transparent ${colorMode === "dark" ? "placeholder-gray-400 text-white" : "placeholder-gray-400 text-gray-900"}`}
                />
                <button
                  onClick={handleSearchGemini}
                  className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
                  disabled={loading || query.trim() === ""}
                >
                  {loading ? "Loading..." : "Generate README"}
                </button>
              </div>
            </div>
          </div> */}

          <div className="flex justify-between items-center mb-2 mt-8">
            <div className=" PubBtn absolute top-2 right-24">
              <div>
                {/* The button that opens the modal */}
                {localStorage.getItem('authToken') && (

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    colorScheme="blue"
                    variant="outline"
                    leftIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                      </svg>
                    }
                  >
                    {projectId === undefined ? 'Publish' : 'Edit'}
                  </Button>
                )}


                {/* Modal Component */}
                <PublishModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  markdownContent={value}
                  setValue={setValue}
                />
              </div>
            </div>
            <div
              className="absolute top-2 right-2"
              role="button"
              tabIndex="0"
              onClick={downloadMarkdown}
            >
              <div className="edit-post">
                <span className="edit-tooltip">Download .md</span>
                <span className="edit-icon">
                  <img src={downloadIcon} alt="Download Icon" />
                </span>
              </div>
            </div>
          </div>
          <MDEditor
            height={700}
            value={value}
            onChange={handleValueChange}
            commands={[commands.codePreview, help]}
          />
        </div>



      </div>

      <div className="mt-9 mb-0 flex justify-center px-4">
        <div className="relative w-full max-w-[700px]">
          
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradientSpin opacity-80 blur-sm"></div>

          
          <div
            className={`relative z-10 flex items-center rounded-xl px-4 py-2 shadow-md space-x-2 ${colorMode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
          >
            <input
              type="text"
              placeholder="Let AI assist you with your ideas"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`flex-1 outline-none text-base bg-transparent ${colorMode === "dark" ? "placeholder-gray-400 text-white" : "placeholder-gray-400 text-gray-900"
                }`}
            />
            <button
              onClick={handleSearchGemini}
              className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
              disabled={loading || query.trim() === ""}
            >
              {loading ? "Loading..." : "Generate README"}
            </button>
          </div>
        </div>
      </div>


      {!isAuthenticated ? (
        <div className="editor-card-container">
          <div className="blurred-editor-card">
            <EditorCardUnLogged />
          </div>
          <div className="overlay">
            <p className="overlay-text">Login to view this content</p>
            <button
              className="login-button"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="editor-card-container">
            <EditorCardUnLogged />
          </div>
          <div className="flex justify-center items-center h-20">
            <Link onClick={goTempCompoPage}>
              <button
                className={`border hover:scale-95 duration-300 relative group cursor-pointer ${colorMode === "dark"
                  ? "text-sky-50 bg-sky-700 border-sky-600"
                  : "text-sky-50 bg-sky-200 border-sky-300"
                  } overflow-hidden h-16 w-64 rounded-md p-2 flex justify-center items-center font-extrabold text-lg font-sans`}
              >
                <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
                <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                <p className="z-10">View More</p>
              </button>
            </Link>
          </div>
        </>
      )}

      {/* Add the modals here */}
      {isChangeMode ? (
        <RegistrationModal
          isOpen={isRegistrationOpen || isChangeMode}
          onClose={() => {
            setChangeMode(false);
            handleRegistrationClose();
          }}
          setChangeMode={setChangeMode}
        />
      ) : (
        <LoginModal
          isOpen={isLoginOpen && !isChangeMode}
          onClose={() => {
            setChangeMode(false);
            handleLoginClose();
          }}
          setChangeMode={setChangeMode}
          setName={setName}
          onSuccess={handleLoginSuccess} // Pass success handler to modal
        />
      )}
    </>
  );
}
