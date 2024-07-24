import React, { useState, useEffect } from "react";
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
  const initialMkdStr = `*LOGIN TO USE DIRECT TEMPLATES*`;
  const [value, setValue] = useState(initialMkdStr);

  const [elementData, setElementData] = useState([
    {
      slno: "1",
      title: "Project Title",
      desc: "A brief introduction or overview of what the project is about.",
      code: "# Project Title\n\nA brief introduction or overview of what the project is about.",
    },
    {
      slno: "2",
      title: "Description",
      desc: "Provide a detailed description of the project. Explain its purpose, goals, and any other relevant information that would help someone understand the project's significance.",
      code: "## Description\n\nProvide a detailed description of the project. Explain its purpose, goals, and any other relevant information that would help someone understand the project's significance.",
    },
    {
      slno: "3",
      title: "Features",
      desc: "List the key features or functionalities of the project.",
      code: "## Features\n\n- Feature 1\n- Feature 2\n- Feature 3",
    },
    {
      slno: "4",
      title: "Demo",
      desc: "Provide a link or instructions on how to access a live demo of the project if available.",
      code: "## Demo\n\nProvide a link or instructions on how to access a live demo of the project if available.",
    },
    {
      slno: "5",
      title: "Screenshots",
      desc: "Include screenshots of the project in action to visually demonstrate its usage.",
      code: "## Screenshots\n\n![Screenshot 1](/screenshots/screenshot1.png)\n\n![Screenshot 2](/screenshots/screenshot2.png)",
    },
    {
      slno: "6",
      title: "Technologies Used",
      desc: "List the technologies, frameworks, libraries, or any other tools used in the project.",
      code: "## Technologies Used\n\n- Technology 1\n- Technology 2\n- Framework 1",
    },
    {
      slno: "7",
      title: "Installation",
      desc: "Provide step-by-step instructions on how to install and set up the project. This should include dependencies, environment setup, and any configurations needed.",
      code: "## Installation\n\nProvide step-by-step instructions on how to install and set up the project. This should include dependencies, environment setup, and any configurations needed.",
    },
    {
      slno: "8",
      title: "Usage",
      desc: "Explain how to use the project. Provide examples or screenshots if possible. Include any details that users might need to know about interacting with the project.",
      code: "## Usage\n\nExplain how to use the project. Provide examples or screenshots if possible. Include any details that users might need to know about interacting with the project.",
    },
    {
      slno: "9",
      title: "API Reference",
      desc: "Provide detailed documentation for the API endpoints.",
      code: "## API Reference\n\n### Get all items\n\n```http\nGET /api/items\n```\n\n| Parameter | Type     | Description                |\n| :-------- | :------- | :------------------------- |\n| `api_key` | `string` | **Required**. Your API key |\n\n### Get item\n\n```http\nGET /api/items/${id}\n```\n\n| Parameter | Type     | Description                       |\n| :-------- | :------- | :-------------------------------- |\n| `id`      | `string` | **Required**. Id of item to fetch |\n",
    },
    {
      slno: "10",
      title: "Configuration",
      desc: "Explain any configuration options or customizations available in the project.",
      code: "## Configuration\n\nExplain any configuration options or customizations available in the project.",
    },
    {
      slno: "11",
      title: "Tests",
      desc: "Describe how to run tests for the project, if applicable.",
      code: "## Tests\n\nDescribe how to run tests for the project, if applicable.",
    },
    {
      slno: "12",
      title: "Deployment",
      desc: "Provide instructions on how to deploy the project to a production environment.",
      code: "## Deployment\n\nProvide instructions on how to deploy the project to a production environment.",
    },
    {
      slno: "13",
      title: "Contributing",
      desc: "Guidelines for contributing to the project. Include instructions for how to submit issues, propose features, and submit pull requests. Mention any coding standards or practices.",
      code: "## Contributing\n\nGuidelines for contributing to the project. Include instructions for how to submit issues, propose features, and submit pull requests. Mention any coding standards or practices.",
    },
    {
      slno: "14",
      title: "Code Example",
      desc: "Insert a code snippet that demonstrates a core feature or function of your project. This can be in any programming language relevant to your project.",
      code: "## Code Example\n\n```python\n# Insert your code snippet here\n```",
    },
    {
      slno: "15",
      title: "Code Structure",
      desc: "Explain the organization and structure of the codebase.",
      code: "## Code Structure\n\nExplain the organization and structure of the codebase.",
    },
    {
      slno: "16",
      title: "File Structure",
      desc: "Provide an overview of the project's file structure.",
      code: "## File Structure\n\nProvide an overview of the project's file structure.",
    },
    {
      slno: "17",
      title: "Contributors",
      desc: "List the contributors to the project.",
      code: "## Contributors\n\n- Contributor 1\n- Contributor 2\n- Contributor 3",
    },
    {
      slno: "18",
      title: "FAQ",
      desc: "Answer frequently asked questions about the project.",
      code: "## FAQ\n\nAnswer frequently asked questions about the project.",
    },
    {
      slno: "19",
      title: "Roadmap",
      desc: "Outline the planned future development of the project.",
      code: "## Roadmap\n\nOutline the planned future development of the project.",
    },
    {
      slno: "20",
      title: "Support",
      desc: "Provide information on how users can get support for the project, such as links to documentation, community forums, or support email addresses.",
      code: "## Support\n\nProvide information on how users can get support for the project, such as links to documentation, community forums, or support email addresses.",
    },
    {
      slno: "21",
      title: "Acknowledgements",
      desc: "Recognize and thank contributors, libraries, or other projects that have inspired or assisted your work.",
      code: "## Acknowledgements\n\nRecognize and thank contributors, libraries, or other projects that have inspired or assisted your work.",
    },
    {
      slno: "22",
      title: "Changelog",
      desc: "Document changes to the project in each version.",
      code: "## Changelog\n\nDocument changes to the project in each version.",
    },
    {
      slno: "23",
      title: "Security",
      desc: "Provide information about security considerations or vulnerabilities related to the project.",
      code: "## Security\n\nProvide information about security considerations or vulnerabilities related to the project.",
    },
    {
      slno: "24",
      title: "License",
      desc: "Specify the license under which the project is distributed. Include any terms or conditions associated with the use of your project.",
      code: "## License\n\nSpecify the license under which the project is distributed. Include any terms or conditions associated with the use of your project.",
    },
    {
      slno: "25",
      title: "Contact",
      desc: "Provide contact information for users to reach out regarding the project.",
      code: "## Contact\n\nProvide contact information for users to reach out regarding the project.",
    },
    {
      slno: "26",
      title: "References",
      desc: "List any references or external resources used in creating the project.",
      code: "## References\n\nList any references or external resources used in creating the project.",
    },
    {
      slno: "27",
      title: "Acknowledgement Codes",
      desc: "List of acknowledgements with links.",
      code: "## Acknowledgement Codes\n\n- [Example Link 1](http://example.com)\n- [Example Link 2](http://example.com)\n- [Example Link 3](http://example.com)",
    },
  ]);

  const [selectedElements, setSelectedElements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState([]);

  // Update filteredElements whenever elementData or searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredElements(elementData);
    } else {
      const filtered = elementData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredElements(filtered);
    }
  }, [elementData, searchQuery]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <div className="editorHeading mb-10">
    <span> ReadMeMaker Ultimate Editor </span>
    </div>
    <div className="flex flex-col md:flex-row mx-2 md:mx-10 mt-32 md:mt-34">
      {/* Left Panel - Element List */}
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
      <div className="md:w-2/3 p-4 md:p-4 ml-0 md:ml-4 bg-white border border-gray-300 rounded-3xl">
        <MDEditor
          height={600}
          value={value}
          commands={[...commands.getCommands(), help]}
          onChange={setValue}
        />
      </div>
    </div>
    </>
  );
}
