import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Text,
  Box,
  VStack,
  useBreakpointValue,
  chakra,
} from "@chakra-ui/react";
import QR from "../../MediaFiles/QR.jpg";
import Gareebi from "../../MediaFiles/golmaal.jpg";

const CoffeePage = ({ isOpen, onClose }) => {
  const boxSize = useBreakpointValue({ base: "200px", md: "250px" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const padding = useBreakpointValue({ base: 2, md: 4 });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay
        bg="blackAlpha.600" // Optional: add a semi-transparent background color
        backdropFilter="blur(8px)" // Apply the blur effect
      />
      <ModalContent>
        <ModalHeader
          textAlign="center"
          fontSize={useBreakpointValue({ base: "lg", md: "xl" })}
        >
          ReadMeMaker Server !Support
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center" p={padding}>
            <Image
              src={Gareebi}
              alt="Mai Gareeb Hu"
              width={{ base: "250px", md: "300px" }}
              borderRadius="md"
              borderWidth={2}
              borderColor="gray.200"
            />

            <Text fontSize={fontSize} textAlign="center">
              नमस्ते! दोस्तों 🌟 ⚔️ If our work has helped you like a perfect
              *cup of chai* in the morning, why not support us to keep it
              running smoothly? 🍵
            </Text>
            <Text fontSize={fontSize} textAlign="center">
              Tu ek kaam kar, ye mera QR hai, tu mujhe thoda support de!
              (!Server ka kharcha pani) 🍁 🌿
            </Text>
            <Text fontSize={fontSize} textAlign="center">
              Not A Get Me 🍵 Page as Yaha Parle-G khana pad raha hai{" "}
              <chakra.span fontWeight="bold">Kali Chai mai dubokar</chakra.span>{" "}
              🥹
            </Text>
            <Box>
              <Image
                src={QR}
                alt="QR Code"
                boxSize={boxSize}
                borderRadius="md"
                borderWidth={2}
                borderColor="gray.200"
                mb={4}
              />
            </Box>
            <Text fontSize={fontSize} textAlign="center">
              Me Receiving Payment Notification{" "}
              <chakra.span fontWeight="bold">
                "Sanskar Umar Se Bade Hai Inke"
              </chakra.span>
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoffeePage;
