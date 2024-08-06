import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Textarea, useToast } from '@chakra-ui/react';
import { toast } from "react-toastify"
const EditDescriptionModal = ({ isOpen, onClose, email, description, setDescription }) => {
    const [newDescription, setNewDescription] = useState(description);

    const handleSave = async () => {
        try {
            const response = await fetch(`https://readmemaker-backend.vercel.app/users/updateDescription/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: newDescription }),
            });
            const data = await response.json();
            if (response.ok) {
                setDescription(newDescription);
                toast.success(data.message);
                onClose();
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error('Error updating description');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Description</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Enter new description"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditDescriptionModal;
