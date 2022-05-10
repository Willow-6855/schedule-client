import React, { useEffect } from 'react'

import { Text, Button, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

const Announcements = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        if(!localStorage.getItem('announcement-11')){
            onOpen()
            localStorage.setItem('announcement-11', 'seen')
        }
    }, [])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>HSE News</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Happy Adam Sandler Day! </Text>
                    <br></br>
                    <img src="https://www.highsnobiety.com/static-assets/thumbor/SXbsUkCaRWjLAt7gYKByA8AagBA=/1600x2400/www.highsnobiety.com/static-assets/wp-content/uploads/2021/12/08155944/adam-s-04.jpg" />
                </ModalBody>

                <ModalFooter>
                    
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        I want to be like him.
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
    )
}

export default Announcements
