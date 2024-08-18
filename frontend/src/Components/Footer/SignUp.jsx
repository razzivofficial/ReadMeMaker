/* Email page page */
import { useState, React } from "react";
import { Heading, Text } from "@chakra-ui/react";

export default function FooterSignup() {
  const [inputText, setInputText] = useState("");
  const footerEmailMessage = (e) => {
    const text = e.target.value;
    setInputText(text);
  };
  return <></>;
}
