import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-3')){
            onOpen()
            localStorage.setItem('announcement-3', 'seen')
        }
    }, [])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>4th Lunch Period</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>With all lunch periods being packed with students, the school has made the decision to create a 4th lunch period, D lunch</Text>
                    <br></br>
                    <Text>This new lunch period will still be in Period 3.</Text>
                    <br></br>
                    <Text>Skyward will be updated on Saturday to include your updated lunch period. Also make sure to set it in this app</Text>
                    <br></br>
                    <Text fontWeight="bold">The updated Bell Schedule and lunch assignments will be in effect starting on Monday, August 9th</Text>
                    <br></br>
                </ModalBody>

                <ModalFooter>
                    
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Ok
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
    )
}

export default Announcements
