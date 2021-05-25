import React, {useState, useContext, useEffect} from 'react';

import { Text, Image, Box, HStack, Flex, Spacer, useDisclosure, IconButton, Button, useColorMode, Switch, Stack, Radio, RadioGroup } from "@chakra-ui/react"
import { Modal, ModalOverlay,ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

import { SettingOutlined, GithubOutlined, InstagramOutlined, TeamOutlined } from '@ant-design/icons';
import { ChatIcon } from '@chakra-ui/icons'


import logo from '../Assets/hseapps.png'


const Navbar = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    
    
    const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('scheduleSettings')))
    const [settingsPending, setSettingsPending] = useState(settings)
    
    const closeModal = () => {
        onClose()
        setSettingsPending(settings)
    }
    
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

            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay/>
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalBody>
                    <Stack direction="column" style={{display: 'flex', justifyContent: 'space-between', marginBottom: "20px", marginTop: "3px"}}>
                        
                        <div style={{marginTop: "3px",  marginBottom: "20px"}}>
                            <Text strong style={{fontSize: "10px", marginBottom: "10px"}}>LUNCH</Text>
                            <RadioGroup onChange={((e) => {setSettingsPending({...settingsPending, lunch: e}) }) } value={settingsPending['lunch']}>
                                <Stack direction="row">
                                    <Radio value="A">A Lunch</Radio>
                                    <Radio value="B">B Lunch</Radio>
                                    <Radio value="C">C Lunch</Radio>
                                </Stack>
                            </RadioGroup>
                        </div>
                        <div style={{marginTop: "3px",  marginBottom: "20px"}}>
                            <Text strong style={{fontSize: "10px", marginBottom: "10px"}}>DISPLAY</Text>
                            <RadioGroup onChange={((e) => {setSettingsPending({...settingsPending, display: e}) }) } value={settingsPending['display']}>
                                <Stack direction="row">
                                    <Radio value="Period">Period</Radio>
                                    <Radio value="Timer">Timer</Radio>
                                    
                                </Stack>
                            </RadioGroup>
                        </div>
                        <div style={{marginTop: "3px",  marginBottom: "20px"}}>
                            <Text strong style={{fontSize: "10px", marginBottom: "10px"}}>DARK MODE </Text>
                            
                            <Switch isChecked={colorMode == "dark" ? true : false} onChange={toggleColorMode} size="lg"></Switch>
                        </div>

                    </Stack>

                    <div style={{width: '100%', textAlign:'center', marginTop: "30px"}}>
                        <Text style={{fontSize: '12px'}}>Made by HSE Apps</Text>
                        
                        <a target="_blank" href="https://hseapps.org/about"><TeamOutlined style={{marginRight: '8px', color: "#1890ff"}}></TeamOutlined></a>
                        <a target="_blank" href="https://www.instagram.com/hseapps/"><InstagramOutlined style={{marginRight: '8px', color: "#1890ff"}}></InstagramOutlined></a>
                        <a target="_blank" href="https://github.com/HSE-Apps"><GithubOutlined style={{marginRight: '8px', color: "#1890ff"}}></GithubOutlined></a>
                        <a target="_blank" href="https://forms.gle/89AcvDmLDaX8qgu86"><ChatIcon style={{marginRight: '8px', marginTop:"6px", color: "#1890ff"}}></ChatIcon></a>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button mr={2} variant="ghost" onClick={() =>{
                        onClose()
                        setSettingsPending(settings)

                    }}>Cancel</Button>
                    <Button colorScheme="blue" mr={3} onClick={() => {
                        onClose()
                        setSettings(settingsPending)
                        localStorage.setItem('scheduleSettings', JSON.stringify(settingsPending))
                    }}>
                        Save
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
                

        
        </div>
    )


}



export default Navbar