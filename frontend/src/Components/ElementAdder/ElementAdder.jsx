import { Divider, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import ReactMarkdown from "react-markdown";

export default function ElementAdder() {
  const [markDown, setMarkDown] = useState("#Welcome to ReadMeMaker");
  return (
    <>
      <div className="flex mt-32 h-screen w-[100%] flex-col items-center gap-y-2">
        <div className="" style={{ display: "flex", flexDirection: "row" }}>
          <textarea
            className="bg-slate-100 m-6"
            name=""
            id=""
            cols="70"
            style={{ color: "black" }}
            value={markDown}
            onChange={(e) => setMarkDown(e.target.value)}
          ></textarea>
          <div className="bg-slate-900 m-6 w-[100px]" style={{ color: "white" }}>
            <ReactMarkdown>{markDown}</ReactMarkdown>
          </div>
          {/* <ReactMarkdown>{markDown}</ReactMarkdown> */}
          <div className="w-[25%] rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-lg shadow-gray-200">
            <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700">
              <div>Add Elements</div>
              {/* {Search bar code starts} */}
              <div className="pt-2 flex relative mx-auto text-gray-600 ">
                <input
                  className="border-2 w-[100%] border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search Elements"
                ></input>
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-4"
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
                <GrPowerReset className="text-3xl mx-3" />
              </Button>
              {/* {Search bar code ends} */}
            </div>
            <div className="mt-5">
              <Divider />
              <div className="flex max-h-[400px] w-full flex-col overflow-y-scroll">
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-blue-900">
                      A
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Text</p>
                    <span className="text-xs font-light text-gray-400">
                      just start writing with plain text
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-blue-900">
                      <svg
                        className="mx-auto h-6 w-6"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Checklist</p>
                    <span className="text-xs font-light text-gray-400">
                      create a to-do or checklist
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-blue-900">
                      {" "}
                      H1{" "}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Heading 1</p>
                    <span className="text-xs font-light text-gray-400">
                      Big section heading
                    </span>
                  </div>{" "}
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-blue-900">
                      {" "}
                      H2{" "}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Heading 2</p>
                    <span className="text-xs font-light text-gray-400">
                      Medium section heading
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-lg font-medium text-gray-700 group-hover:text-blue-900">
                      {" "}
                      H3{" "}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Heading 3</p>
                    <span className="text-xs font-light text-gray-400">
                      small section heading
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                {/* <h3 className="my-2 px-4 text-[15px] text-gray-400">More</h3> */}
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-xl font-medium text-gray-700 group-hover:text-blue-900">
                      <svg
                        className="mx-auto h-6 w-6"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Bullet list</p>
                    <span className="text-xs font-light text-gray-400">
                      Create a simple bullet list
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-xl font-medium text-gray-700 group-hover:text-blue-900">
                      <svg
                        className="mx-auto h-6 w-6"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                      >
                        <g fill="currentColor" fillRule="evenodd">
                          <path d="M21 16a1 1 0 0 1 0 2H10a1 1 0 0 1 0-2h11zm0-10a1 1 0 0 1 0 2H10a1 1 0 1 1 0-2h11z"></path>
                          <path d="M4.464 13.74c.256 0 .496.036.72.108.224.072.419.179.584.32.165.141.295.319.388.532.093.213.14.461.14.744 0 .181-.019.345-.056.492a1.666 1.666 0 0 1-.392.732c-.09.101-.19.2-.296.296l-1.72 1.48h2.512V19.5H2.392v-1.272l2.2-1.976c.112-.101.224-.216.336-.344a.66.66 0 0 0 .168-.448.544.544 0 0 0-.208-.452.765.765 0 0 0-.488-.164c-.224 0-.399.07-.524.208a.839.839 0 0 0-.212.512l-1.2-.088c.016-.293.077-.548.184-.764.107-.216.248-.396.424-.54.176-.144.383-.252.62-.324.237-.072.495-.108.772-.108zm.992-9.404V10H4.304V5.68l-1.136 1-.68-.784 1.848-1.56h1.12z"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Ordered list</p>
                    <span className="text-xs font-light text-gray-400">
                      Create a list with numbered
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
                <div className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-blue-100">
                  <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-blue-200">
                    <span className="tag w-full text-center text-xl font-medium text-gray-700 group-hover:text-blue-900">
                      <svg
                        className="mx-auto h-6 w-6"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-between font-light text-gray-600">
                    <p className="text-[15px]">Info box</p>
                    <span className="text-xs font-light text-gray-400">
                      Add a box with additional info
                    </span>
                  </div>
                  <div className="flex-grow"></div>{" "}
                  <button>
                    <AiFillPlusCircle className="text-3xl mx-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
