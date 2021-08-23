import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-5')){
            onOpen()
            localStorage.setItem('announcement-5', 'seen')
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
                    <Text>We hope you had an awesome weekend. It's the HSETV crew here to once again remind you (and your teachers) that today there is another newscast!</Text>
                    <br></br>
                    <Text>Teachers, make sure to show the newscast right after the pledge during pathways! Use this link to access it:</Text>
                    <br></br>
                    <Text style={{color: "#1890ff"}}><a href="https://www.hsenews.com/category/hsetv/newscasts/">Newscast Link</a> </Text>
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
