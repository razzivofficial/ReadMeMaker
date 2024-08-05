import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { BiHelpCircle } from "react-icons/bi";
import EditorCard from "../EditorCard/EditorCard";
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [elementData, setElementData] = useState([
    {
      slno: "1",
      title: "Logo and Title",
      desc: "Unveil your project's superstar! Showcase your dazzling logo and give your project a blockbuster title right at the top. It’s like the red carpet for your README!",
      code: '## Logo and Title\n\n<div align="center">\n   <img src="https://example.com/logo.png" alt="Project Logo" />\n    <h1>Project Title</h1>\n</div>',
    },
    {
      slno: "2",
      title: "Project Title",
      desc: "Introduce your project like a rock star. Share the name and give a sneak peek of what makes it shine. It’s the trailer before the main feature!",
      code: "# Project Title\n\nA brief introduction or overview of what the project is about.",
    },
    {
      slno: "3",
      title: "Description",
      desc: "Spin a yarn about your project. Dive into the details and tell everyone why it’s the best thing since sliced bread. This is where the magic happens!",
      code: "## Description\n\nProvide a detailed description of the project. Explain its purpose, goals, and any other relevant information that would help someone understand the project's significance.",
    },
    {
      slno: "4",
      title: "Features",
      desc: "Highlight the superpowers of your project. List out its amazing features like they’re special abilities that would make any superhero jealous.",
      code: "## Features\n\n- **[Feature 1 Name]**: [Brief description of the feature and its key benefit.]\n- **[Feature 2 Name]**: [Brief description of the feature and its key benefit.]",
    },
    {
      slno: "5",
      title: "Demo",
      desc: "Give a sneak peek into the action! Share a link or instructions so everyone can see your project in its full glory. It’s like the live concert of your code!",
      code: "## Demo\n\nProvide a link or instructions on how to access a live demo of the project if available.",
    },
    {
      slno: "6",
      title: "Screenshots",
      desc: "Show off your project's best angles. Add screenshots like a photo album, so everyone can see your project strutting its stuff in real-time.",
      code: "## Screenshots\n\n![Screenshot 1](/screenshots/screenshot1.png)\n\n![Screenshot 2](/screenshots/screenshot2.png)",
    },
    {
      slno: "7",
      title: "Tech Stack",
      desc: "Reveal the secret recipe behind your project. List the technologies and tools like a culinary masterpiece, so everyone knows what made this dish so delicious.",
      code: "## Tech Stack\n\n**Client:** React, Redux, TailwindCSS\n\n**Server:** Node, Express",
    },
    {
      slno: "8",
      title: "Installation",
      desc: "Roll out the red carpet for your users with step-by-step instructions to install your project. Make it so easy, even your grandma could do it—if she were into coding, of course.",
      code: "## Installation\n\nInstall the project with npm:\n\n```bash\nnpm install project-name\ncd project-name\n```",
    },
    {
      slno: "9",
      title: "Usage",
      desc: "Guide your users through the marvels of your project. Provide instructions and examples like you’re giving a personal tour of an amusement park.",
      code: "## Usage\n\nExplain how to use the project. Provide examples or screenshots if possible. Include any details that users might need to know about interacting with the project.",
    },
    {
      slno: "10",
      title: "API Reference",
      desc: "Map out the API like it’s a treasure hunt. Provide detailed documentation so users can navigate through endpoints like they’re following a treasure map to hidden goodies.",
      code: "## API Reference\n\n### Get all items\n\n```http\nGET /api/items\n```\n\n| Parameter | Type     | Description                |\n| :-------- | :------- | :------------------------- |\n| `api_key` | `string` | **Required**. Your API key |\n\n### Get item\n\n```http\nGET /api/items/${id}\n```\n\n| Parameter | Type     | Description                       |\n| :-------- | :------- | :-------------------------------- |\n| `id`      | `string` | **Required**. Id of item to fetch |",
    },
    {
      slno: "11",
      title: "Configuration",
      desc: "Open the hood and show how users can tweak your project. Explain the configuration options like you’re handing out the keys to a fancy sports car.",
      code: "## Configuration\n\nExplain any configuration options or customizations available in the project.",
    },
    {
      slno: "12",
      title: "Tests",
      desc: "Guide users through the testing arena. Describe how to run tests like you’re giving them a cheat sheet to beat the final boss of the project.",
      code: "## Running Tests\n\nTo ensure the integrity of the project, follow these steps to run the tests:\n\n1. **Set Up Your Environment**: Ensure all dependencies are installed and the environment is correctly configured. Refer to the 'Installation' section for details.\n\n2. **Execute Tests**:\n   - For **JavaScript/TypeScript** projects, use:\n     ```sh\n     npm test\n     ```\n     or\n     ```sh\n     yarn test\n     ```\n   - For **Python** projects, use:\n     ```sh\n     pytest\n     ```\n   - For **Java** projects, use:\n     ```sh\n     ./gradlew test\n     ```\n\n3. **Review Results**: Check the test output to ensure all tests pass. Address any failures by consulting the error messages and the relevant code sections.\n\n4. **Additional Options**: Some projects may have additional testing commands or options. Check the project's `package.json` (for JavaScript/TypeScript), `pytest.ini` (for Python), or `build.gradle` (for Java) for more details.\n\nFor further assistance, refer to the project's documentation or contact the maintainers.",
    },
    {
      slno: "13",
      title: "Deployment",
      desc: "Send your project off to the big leagues! Provide instructions on deploying your project like you’re sending it off to a space mission—complete with the countdown.",
      code: "## Deployment\n\nTo deploy this project, run the following command:\n\n```bash\nnpm run deploy\n```",
    },
    {
      slno: "14",
      title: "Contributing",
      desc: "Roll out the invitation! Share how others can contribute to your project, like you’re hosting a grand party and everyone’s invited to bring their own flair.",
      code: "## Contributing\n\nWe’re thrilled that you’re interested in contributing to our project! Here’s how you can get involved:\n\n### How to Contribute\n\n1. **Submit Issues**:\n   - If you encounter any bugs or have suggestions for improvements, please submit an issue on our [GitHub Issues](https://github.com/your-repo/issues) page.\n   - Provide as much detail as possible, including steps to reproduce and screenshots if applicable.\n\n2. **Propose Features**:\n   - Have a great idea for a new feature? Open a feature request issue in the same [GitHub Issues](https://github.com/your-repo/issues) page.\n   - Describe the feature in detail and explain how it will benefit the project.\n\n3. **Submit Pull Requests**:\n   - Fork the repository and create a new branch for your changes.\n   - Make your modifications and test thoroughly.\n   - Open a pull request against the `main` branch of the original repository. Include a clear description of your changes and any relevant context.\n\n### Coding Standards\n\nTo maintain the quality of the codebase, please follow these guidelines:\n- **Code Style**: Adhere to our [code style guide](https://github.com/your-repo/style-guide) (e.g., indentation, naming conventions).\n- **Documentation**: Update documentation as necessary to reflect any changes.\n- **Testing**: Ensure that your changes do not break existing functionality and that new code is covered by tests.\n\n### Getting Help\n\nIf you have any questions or need assistance, feel free to reach out to us via [GitHub Discussions](https://github.com/your-repo/discussions) or contact us directly at [email@example.com](mailto:email@example.com).\n\nThank you for your interest in contributing! Your involvement helps make this project better for everyone.",
    },
    {
      slno: "15",
      title: "Code Example",
      desc: "Show off a snippet of your project's magic. Insert a code example like you're revealing a magic trick—just without the top hat and rabbit.",
      code: "## Code Example\n\n```python\n# Insert your code snippet here\n```",
    },
    {
      slno: "16",
      title: "Code Structure",
      desc: "Give a backstage tour of your codebase. Explain how the code is organized like you’re describing the layout of a grand theater.",
      code: "## Code Structure\n\nWelcome to the backstage of our project! Here’s an overview of how the codebase is organized:\n\n### Project Layout\n\n1. **Root Directory**:\n   - `README.md`: This file you’re reading, providing an overview of the project.\n   - `LICENSE`: The licensing information for the project.\n   - `package.json` or `pom.xml` or `requirements.txt`: Project configuration files depending on the language and build system.\n   - `src/`: Contains the source code for the project.\n   - `tests/`: Contains test cases and testing utilities.\n   - `docs/`: Documentation files and guides.\n\n2. **Source Code Directory (`src/`)**:\n   - **Main Module**: The core functionality of the application. For instance, in a web application, this might include components, services, and utilities.\n   - **Submodules**: Organized by feature or functionality. For example, `user/`, `admin/`, `payment/` for a multi-module application.\n   - **Configuration Files**: Application configuration files like `.env` or `config/`. These might include environment-specific settings or third-party integrations.\n\n3. **Tests Directory (`tests/`)**:\n   - **Unit Tests**: Tests for individual functions or components, typically organized to mirror the structure of the source code.\n   - **Integration Tests**: Tests that check the interactions between different modules or components.\n   - **End-to-End Tests**: Tests that simulate user interactions with the application to ensure end-to-end functionality.\n\n4. **Documentation Directory (`docs/`)**:\n   - **Guides**: Detailed guides on how to use or extend the project.\n   - **API Documentation**: Information about the public API, including endpoints, methods, and parameters.\n   - **Changelog**: A log of all significant changes and updates to the project.\n\n### Additional Notes\n\n- **Branching Strategy**: Our Git workflow involves branches for features, bugs, and releases. Refer to our [Git Flow](https://github.com/your-repo/git-flow) guide for details.\n- **Code Style**: We follow specific coding conventions to maintain consistency. See our [Style Guide](https://github.com/your-repo/style-guide) for more information.\n\nThis structure is designed to help maintain clarity and organization as the project evolves. Feel free to explore and familiarize yourself with our codebase!",
    },
    {
      slno: "17",
      title: "File Structure",
      desc: "Provide a road map to your project’s file structure. Describe the files like you’re narrating a treasure map—X marks the spot where each important file resides.",
      code: "## File Structure\n\nHere’s a guide to the essential files and directories in our project:\n\n- **`README.md`**: Overview and documentation of the project.\n- **`src/`**: Contains the main source code.\n  - **`index.js`**: Entry point of the application.\n  - **`components/`**: Reusable components.\n- **`tests/`**: Unit and integration tests.\n- **`docs/`**: Project documentation and guides.\n- **`config/`**: Configuration files for different environments.\n\nThis map will help you navigate the project and locate key files with ease!",
    },
    {
      slno: "18",
      title: "Contributors",
      desc: "Give a shout-out to your project’s all-star team. List the contributors like you’re introducing the cast of a blockbuster movie.",
      code: "## Contributors\n\n- **Contributor 1**: [Role/Contribution]\n- **Contributor 2**: [Role/Contribution]\n- **Contributor 3**: [Role/Contribution]\n\nA big thank you to everyone who made this project possible!",
    },
    {
      slno: "19",
      title: "FAQ",
      desc: "Answer the burning questions like a wise oracle. Provide answers to frequently asked questions as if you’re hosting a Q&A session for an eager audience.",
      code: "## FAQ\n\n**Q: [Question 1]?**\n- **A:** [Brief answer to question 1]\n\n**Q: [Question 2]?**\n- **A:** [Brief answer to question 2]\n\nGot more questions? Feel free to reach out or check our [support page](#)!",
    },
    {
      slno: "20",
      title: "Roadmap",
      desc: "Chart the journey ahead for your project. Outline the future development plans like you’re plotting the sequel to a blockbuster saga.",
      code: "## Roadmap\n\nHere’s a glimpse into the exciting journey ahead for our project:\n\n### Upcoming Milestones\n\n- **Q3 2024**: \n  - [Feature 1]: Brief description of the feature.\n  - [Improvement 1]: What it will enhance or fix.\n\n- **Q4 2024**: \n  - [Feature 2]: Brief description of the feature.\n  - [Release 1]: Major update or new release details.\n\n- **2025**: \n  - [Long-Term Goal 1]: Vision or major project milestones.\n  - [Future Feature]: Expected future features or improvements.\n\nWe’re excited about what’s coming and will keep you updated as we progress. Your feedback and support are crucial as we build the future!",
    },
    {
      slno: "21",
      title: "Support",
      desc: "Guide users to get the help they need. Provide support information like a helpful guide leading them to the nearest help desk at a theme park.",
      code: "## Support\n\nNeed help? Here’s how you can get support:\n\n- **Documentation**: [Link to documentation]\n- **Community Forums**: [Link to forums]\n- **Support Email**: [support@example.com]\n\nWe’re here to assist you!",
    },
    {
      slno: "22",
      title: "Acknowledgements",
      desc: "Give credit where credit’s due. Recognize the heroes, libraries, and inspirations behind your project like you’re giving a heartfelt Oscar speech.",
      code: "## Acknowledgements\n\n- **[Person/Library/Tool]**: [Contribution or influence]\n- **[Person/Library/Tool]**: [Contribution or influence]\n\nThank you to everyone who contributed to this project!",
    },
    {
      slno: "23",
      title: "Changelog",
      desc: "Track the evolution of your project. Document changes like you’re keeping a diary of epic battles and legendary upgrades.",
      code: "## Changelog\n\n- **v1.0.0** (2024-07-26): Initial release.\n- **v1.1.0** (2024-08-15): Added new features and fixed bugs.\n- **v2.0.0** (2024-09-01): Major update with significant improvements.\n\nFor detailed changes, refer to [CHANGELOG.md](#).",
    },
    {
      slno: "24",
      title: "Security",
      desc: "Keep your project fortress secure. Provide information on security considerations like you’re handing over the keys to a high-tech security system.",
      code: "## Security\n\n- **Best Practices**: [Outline key security practices]\n- **Vulnerabilities**: [List known vulnerabilities and fixes]\n- **Reporting Issues**: [How to report security issues]\n\nYour security is a priority—please follow these guidelines!",
    },
    {
      slno: "25",
      title: "License",
      desc: "Set the terms of the project’s use. Specify the license like you’re drafting a charter for an exclusive club—membership has its privileges!",
      code: "## License\n\nThis project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details on terms and conditions.\n\nFeel free to use and contribute to the project under these terms!",
    },
    {
      slno: "26",
      title: "Contact",
      desc: "Provide a way for users to reach out. Offer contact details like you’re providing a hotline for VIP access and support.",
      code: "## Contact\n\nFor any inquiries or feedback, reach out to us:\n\n- **Email**: [contact@example.com]\n- **GitHub Issues**: [Link to issues page]\n- **Social Media**: [Links to social media profiles]\n\nWe look forward to hearing from you!",
    },
    {
      slno: "27",
      title: "References",
      desc: "List the sources and inspirations. Share references like you’re crediting the sages and scrolls that guided your way.",
      code: "## References\n\n- **[Reference 1]**: [Description or link]\n- **[Reference 2]**: [Description or link]\n- **[Reference 3]**: [Description or link]\n\nThese sources and inspirations have guided and supported the development of this project.",
    },
    {
      slno: "28",
      title: "Acknowledgement Codes",
      desc: "Celebrate the links that helped along the way. List acknowledgements with clickable links like you’re handing out awards for best supporting roles.",
      code: "## Acknowledgement Codes\n\n- [Example Link 1](http://example.com)\n- [Example Link 2](http://example.com)\n- [Example Link 3](http://example.com)\n\nThese links were invaluable in shaping this project. Check them out!",
    },
    {
      slno: "29",
      title: "Badges",
      desc: "Show off your project's achievements. Add badges like medals in a showcase—let everyone see your project’s honors and awards at a glance.",
      code: "## Badges\n\nDisplay your project’s achievements with badges from services like [shields.io](https://shields.io/):\n\n[![SIT License](https://img.shields.io/badge/License-SIT-green.svg)](https://silicon.ac.in/)\n[![SSLv3 License](https://img.shields.io/badge/License-SSL%20v3-yellow.svg)](https://example.site.com)\n[![IPL License](https://img.shields.io/badge/license-IPL-blue.svg)](http://example-site.com)\n\nBadges help convey the project’s status and achievements at a glance.",
    },
    {
      slno: "30",
      title: "Documentation",
      desc: "Guide users to the treasure trove of information. Provide a link to the documentation like you're handing out the secret map to hidden knowledge.",
      code: "## Documentation\n\nExplore the full documentation for detailed information and guides:\n\n[Documentation](https://linktodocumentation)\n\nEverything you need to know about the project is here!",
    },
    {
      slno: "31",
      title: "Run Locally",
      desc: "Show users how to bring your project home. Provide instructions for running the project locally like you're hosting a DIY workshop.",
      code: "## Run Locally\n\nClone the project:\n\n```bash\ngit clone https://github.com/username/repository.git\n```\n\nNavigate to the project directory:\n\n```bash\ncd repository\n```\n\nInstall dependencies:\n\n```bash\nnpm install\n```\n\nStart the application:\n\n```bash\nnpm start\n```",
    },
    {
      slno: "32",
      title: "Usage/Examples",
      desc: "Provide examples like you're sharing secret recipes. Show users how to use your project with code snippets or instructions as if you're hosting a cooking show.",
      code: "## Usage/Examples\n\n```javascript\nimport Component from 'project-name'\n\nfunction App() {\n  return <Component />\n}\n```",
    },
    {
      slno: "33",
      title: "Live Demo",
      desc: "Let users see your project in action. Provide a link to the live demo like you're inviting them to a live concert where they can see your work on stage.",
      code: "## Live Demo\n\n[Live Demo](https://project-live-demo.example.com/)",
    },
    {
      slno: "34",
      title: "Related Projects",
      desc: "Point out other cool stuff related to your project. List related projects like you’re recommending spin-off series that fans will love.",
      code: "## Related Projects\n\nHere are some related projects:\n\n[Related Project 1](https://github.com/username/related-project-1)\n[Related Project 2](https://github.com/username/related-project-2)",
    },
    {
      slno: "35",
      title: "Feedback",
      desc: "Open the floor for feedback. Provide a way for users to share their thoughts like you're inviting them to a suggestion box at a town hall meeting.",
      code: "## Feedback\n\nIf you have any feedback, please contact us at [feedback@example.com](mailto:feedback@example.com)",
    },
    {
      slno: "36",
      title: "Contributors",
      desc: "Celebrate the heroes of your project. Show the contributors like you’re introducing the cast of a blockbuster film.",
      code: '<div align="center">\n\n[![Contributors](https://contrib.rocks/image?repo=username/repository)](https://github.com/username/repository/graphs/contributors)',
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

  // const toggleAddRemove = (index, code) => {
  //   if (selectedElements.includes(index)) {
  //     setSelectedElements((prevSelected) =>
  //       prevSelected.filter((selected) => selected !== index)
  //     );
  //     setValue((prevValue) => prevValue.replace(code, ""));
  //   } else {
  //     setSelectedElements((prevSelected) => [...prevSelected, index]);
  //     setValue((prevValue) => prevValue + "\n" + code);
  //   }
  // };
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

  // Effect to handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ""; // triggering the confirmation dialog
      }
    };

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
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="editorHeading">
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
            onChange={(v) => {
              setValue(v);
              setHasUnsavedChanges(true);
            }}
            commands={[commands.codePreview, help]}
          />
        </div>
      </div>
      {/* Uncomment this to look on code for templates */}

      <EditorCard />

    </>
  );
}
