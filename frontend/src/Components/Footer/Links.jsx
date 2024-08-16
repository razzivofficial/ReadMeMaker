import React from "react";
import { Link as ChakraLink, IconButton } from "@chakra-ui/react";

const ExternalFooterLink = (props) => {
  const { href, text, isExternal = true } = props;

  return (
    <ChakraLink
      _focus={{ outline: "none", boxShadow: "none" }}
      href={href}
      // target={isExternal ? "_blank" : "_self"}
      target="_self"
      fontWeight={500}
      color="gray.500"
      _hover={{ color: "gray.600", textDecoration: "none" }}
    >
      {text}
    </ChakraLink>
  );
};

const InternalFooterLink = (props) => {
  const { href, text } = props;

  return (
    <>
      <ChakraLink
        _focus={{ outline: "none", boxShadow: "none" }}
        as="span"
        fontWeight={500}
        color="gray.500"
        _hover={{ color: "gray.600", textDecoration: "none" }}
      >
        {text}
      </ChakraLink>
    </>
  );
};

const iconProps = {
  variant: "ghost",
  size: "lg",
  isRound: true,
};

const ExternalSocialLink = (props) => {
  const { href, label, icon, type, isExternal = true } = props;

  return (
    <IconButton
      as={ChakraLink}
      href={href}
      target={isExternal ? "_blank" : "_self"}
      aria-label={label}
      icon={icon}
      colorScheme={type}
      {...iconProps}
    />
  );
};

export { ExternalFooterLink, InternalFooterLink, ExternalSocialLink };
