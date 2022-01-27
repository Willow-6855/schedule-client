import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-6')){
            onOpen()
            localStorage.setItem('announcement-6', 'seen')
        }
    }, [])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>HSE News</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Good morning, Royals! </Text>
                    <br></br>
                    <Text>The calendar feature is finally implemented! It's not perfect but should be fine for the time being :)</Text>
                    <br></br>
                    <Text>Go to the calendar tab on the bottom navigation menu to see a layout of all the royal and blue days!</Text>
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
