import React, {useState, useContext, useEffect} from 'react';

import { Text, Image, Box, HStack, Flex, Spacer, useDisclosure, IconButton, Button, useColorMode } from "@chakra-ui/react"
import { SettingOutlined, } from '@ant-design/icons';
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import logo from '../Assets/hseapps.png'


const Navbar = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    return(
        <div>
            
            <Flex>
                <HStack style={{padding: "10px"}}>
                    <Box>
                        <Image h="40px" src={logo} />
                    </Box>
                    <Text fontWeight="550" fontSize="2xl">HSE Schedule</Text>
                </HStack>
                
                <Spacer />

                <Box style={{padding: "15px 15px 10px 10px"}}>
                    <IconButton onClick={onOpen} colorScheme="blue" isRound="True" icon={<SettingOutlined/>} aria-label="settings" />
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Button onClick={toggleColorMode}>Click for Light</Button>
                </ModalBody>

                <ModalFooter>
                    <Button mr={2} variant="ghost">Cancel</Button>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Save
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
                

        
        </div>
    )


}



export default Navbar