import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-2')){
            onOpen()
            localStorage.setItem('announcement-2', 'seen')
        }
    }, [])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Announcement</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Welcome to the all NEW Schedule App! We've taken feedback from you seriously and implemented new features incuding added stability, dark mode, and more!</Text>
                    <br></br>
                    <Text>Set your lunch period in the settings tab to personalize your experience with the app and also check out our new dark mode!</Text>
                    <br></br>
                    <Text >Please leave any feedback <a style={{color: "#1890ff"}} href="https://forms.gle/ppXB97gXhMb3AuAT9" target="_blank">here</a></Text>
                    <br></br>
                    <Text fontWeight="bold">The HSE Apps welcomes you back and wishes you a good year!</Text>
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
