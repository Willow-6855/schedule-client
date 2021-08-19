import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-4')){
            onOpen()
            localStorage.setItem('announcement-4', 'seen')
        }
    }, [])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>HSE News</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Hello, Royals! </Text>
                    <br></br>
                    <Text>It’s your HSETV crew here to remind you that today, during pathways, you will get to see the first newscast of the year! </Text>
                    <br></br>
                    <Text>Teachers, please remember to show the newscast at the beginning of pathways after the pledge. You can use the link below to access it:</Text>
                    <br></br>
                    <Text style={{color: "#1890ff"}}><a href="https://www.hsenews.com/?p=21055&preview=true">Newscast Link</a> </Text>
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
