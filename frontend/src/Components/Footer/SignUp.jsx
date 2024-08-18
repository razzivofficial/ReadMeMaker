import { useState } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FooterSignup() {
  const [inputText, setInputText] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const footerEmailMessage = (e) => {
    const text = e.target.value;
    setInputText(text);
    validateEmail(text);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!isEmailValid) {
      // Show error toast
      toast.error("Please enter a valid email address.");
      return;
    }

    // Handle valid email submission
    toast.success("Subscription successful! You'll be notified about updates.");
    // Optionally, you can handle the email submission here (e.g., API call)
    console.log("Email submitted:", inputText);
  };

  return (
    <>
      <Heading fontSize="24px" mb="15px" className="yellow-gradient-color">
        Streamline Your Documentation Effort!
      </Heading>
      <Text color="gray.400" mb="15px">
        Get notified about the upcoming sessions, articles, job openings, and
        open-source projects.
      </Text>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="email"
            className="px-6 w-full h-12 rounded-full bg-gray-900 placeholder-gray-300 focus:outline-none text-gray-100 border-0"
            placeholder="Enter your email"
            value={inputText}
            onChange={footerEmailMessage}
          />
          {inputText.length > 0 && (
            <div className="font font-thin text-sm m-2 text-left mx-4">
              We'll always respect your privacy and won't send you unwanted
              emails.
            </div>
          )}
          <button
            type="submit"
            className="absolute top-0 right-0 h-12 px-4 bg-gray-600 rounded-full text-gray-100 hover:bg-yellow-300 hover:text-gray-900"
            disabled={!isEmailValid}
          >
            Subscribe
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
