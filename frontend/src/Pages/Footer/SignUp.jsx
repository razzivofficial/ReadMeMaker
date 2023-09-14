import { useState, React } from "react";
import { Alert, Heading, Text } from "@chakra-ui/react";

export default function FooterSignup() {
  const [inputText, setInputText] = useState("");
  const footerEmailMessage = (e) => {
    const text = e.target.value;
    setInputText(text);
  };
  return (
    <>
      <Heading fontSize="24px" mb="15px" className="yellow-gradient-color">
        Be the first to know
      </Heading>
      <Text color="gray.400" mb="15px">
        Get notified about the upcoming sessions, news, articles, jobs, and
        opensource projects.
      </Text>
      <form action="#">
        <div className="relative">
          <input
            type="email"
            className="px-6 w-full h-12 rounded-full bg-gray-900 placeholder-gray-300 focus:outline-none text-gray-100 border-0"
            // name="emailFooter"
            placeholder="Enter your email"
            onChange={footerEmailMessage}
          />
          {inputText.length > 0 && (
            <div className="font font-thin text-sm m-2 text-left mx-4">
              We'll always respect your privacy and won't send you unwanted
              emails**
            </div>
          )}
          {/* <p class="text-red-500 text-xs italic">We will never disturb youwith unwanted mails and respect your privacy**</p> */}
          <button
            type="submit"
            className="absolute top-0 right-0 h-12 px-4 bg-gray-700 rounded-full text-gray-100 hover:bg-yellow-400 hover:text-gray-900"
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  );
}
