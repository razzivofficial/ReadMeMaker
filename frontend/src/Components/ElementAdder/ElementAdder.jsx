import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { BiHelpCircle } from "react-icons/bi";
import "./ElementAdder.css";
import EditorCard from "../EditorCard/EditorCard";
import elementData from "./elementData";
import EditorCardUnLogged from "../EditorCardUnlogged/EditorCardUnlogged";

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
  const initialMkdStr = `*LOGIN TO USE DIRECT TEMPLATES*`;
  const [value, setValue] = useState(initialMkdStr);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedElements, setSelectedElements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState(elementData);

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
      <div className="editorHeading">
        <span> ReadMeMaker Ultimate Editor </span>
      </div>
      <div className="flex flex-col md:flex-row mx-2 md:mx-10 mt-32 md:mt-34">
        <div className="md:w-1/3 p-2 md:p-4 bg-slate-50 border border-info rounded-3xl mb-8 md:mb-0">
          <h4 className="text-shadow text-2xl font-medium leading-tight text-primary mb-4">
            Shortcuts to Stardom: Ready-Made Readme Sections
          </h4>
          <div className="flex items-center w-full mb-4">
            <input
              className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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
                className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100"
              >
                <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                  <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-blue-900">
                    {item.slno}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-between font-light text-gray-600">
                  <p className="text-xl font-medium">{item.title}</p>
                  <span className="text-xs font-light text-gray-400">
                    {item.desc}
                  </span>
                </div>
                <div className="flex-grow"></div>
                <button onClick={() => toggleAddRemove(index, item.code)}>
                  {isElementSelected(index) ? (
                    <AiFillCheckCircle className="text-3xl mx-3" />
                  ) : (
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Right Panel - Markdown Editor */}
        <div className="md:w-2/3 p-4 md:p-4 ml-0 md:ml-4 bg-white border border-gray-300 rounded-3xl relative">
          <div className="flex justify-between items-center mb-2 mt-8">
            <div className="absolute top-2 right-2">
              <button className="Btn" onClick={downloadMarkdown}>
                <svg
                  className="svgIcon"
                  viewBox="0 0 384 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                </svg>
                <span className="icon2"></span>
                <span className="tooltip">Download</span>
              </button>
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
      {/* add login work */}
      <div className="editor-card-container">
        <div className="blurred-editor-card">
          <EditorCardUnLogged />
        </div>
        <div className="overlay">
          <p className="overlay-text">Login to view this content</p>
          <button
            className="login-button"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>
      {/* if logged in */}
      <EditorCardUnLogged />
    </>
  );
}
