import React, { useState } from "react";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { BiHelpCircle } from "react-icons/bi";
import { Button } from "@chakra-ui/react";
import "./ElementAdder.css";

const help = {
  name: "help",
  keyCommand: "help",
  buttonProps: { "aria-label": "Insert help" },
  icon: (
    <svg viewBox="0 0 16 16" width="12px" height="12px">
      <BiHelpCircle />
    </svg>
  ),
  execute: (state, api) => {
    window.open("/documentation", "_blank");
  },
};

export default function ElementAdder() {
  const initialMkdStr = `## Markdown Editor`;
  const [value, setValue] = useState(initialMkdStr);

  const [elementData, setElementData] = useState([
    {
      slno: "1",
      title: "Acknowledgements",
      desc: "Acknowledgements unordered list",
      code: "# Acknowledgement codes",
    },
    {
      slno: "2",
      title: "API Reference",
      desc: "Acknowledgements unordered list",
      code: "## API Reference hgdidevgidchb",
    },
    {
      slno: "3",
      title: "Appendix",
      desc: "Appendix unordered list",
      code: "### Appendix unordered list kchvedchivihkcvhisvvs",
    },
  ]);

  const [selectedElements, setSelectedElements] = useState([]);

  const toggleAddRemove = (index, code) => {
    if (selectedElements.includes(index)) {
      setSelectedElements((prevSelected) =>
        prevSelected.filter((selected) => selected !== index)
      );
      setValue((prevValue) => prevValue.replace(code, ""));
    } else {
      setSelectedElements((prevSelected) => [...prevSelected, index]);
      setValue((prevValue) => prevValue + "\n" + code);
    }
  };

  const isElementSelected = (index) => selectedElements.includes(index);

  return (
    <>
      {/* EDITOR */}
      <div className="flex mt-32 h-screen mx-10 flex-col">
        <div className="container h-[70%]">
          <h1 className=" text-center text-2xl mb-4">Editor</h1>
          <MDEditor
            height={500}
            value={value}
            commands={[...commands.getCommands(), help]}
            onChange={setValue}
          />
        </div>
      </div>
      <div className=" border border-info rounded-3xl m-8 bg-slate-50">
        <div className="flex flex-col items-center justify-between text-base font-medium text-gray-700">
          <h4 class="mb-3 mt-5 text-2xl font-medium leading-tight text-primary">
            Add Predefined Elements
          </h4>
          <div className="flex items-center justify-center mt-4 w-[40%]">
            <div className="flex relative mx-auto text-gray-600 w-[100%]">
              <input
                className="border-2 w-[100%] border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search Elements"
              ></input>
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
            <Button variant="gradient">
              <GrPowerReset className="text-2xl " />
            </Button>
          </div>
        </div>
        <div className="mt-5 p-5">
          <div className="flex max-h-[400px] flex-col overflow-y-scroll mx-20">
            {elementData.map((item, index) => (
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
                  <p className="text-[15px] text-xl font-medium">
                    {item.title}
                  </p>
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
      </div>
    </>
  );
}
