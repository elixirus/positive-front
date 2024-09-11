import { useWeb3React, type Web3ReactHooks } from '@web3-react/core'
import { isRegisted, registerName } from '../../utils/ctf.utils'
import { useState } from 'react'
import { useDisclosure, Center, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import React from 'react'

import { ethers } from 'ethers'
const toHex = (text: string) => {
  return ethers.encodeBytes32String(text); //.utils.formatBytes32String(text)
}
export function RegisterName({ buttonSize, colorScheme, width }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState('')
  const [telegram, setTelegram] = useState('')
  const { account, isActive, provider } = useWeb3React()

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleTelegramChange = (e) => setTelegram(e.target.value)

  const isErrorUsername = username === ""
  const isErrorTelegram = telegram === ""

  const handleRegister = () => {
    if (!(isActive && account && provider)) return

    if(isErrorUsername) return
    if(isErrorTelegram) return


    registerName(toHex(username), provider).then((result: string) => {
      console.log("register: ", result)
      onClose()
    }).catch((error: any) => { console.log("error: ", error) });
  }

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen} size={buttonSize} colorScheme={colorScheme} width={width}>Register</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Center>    <ModalHeader>Registration</ModalHeader></Center>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={isErrorUsername}>
              <FormLabel>Username</FormLabel>
              <Input type='text' value={username} onChange={handleUsernameChange} ref={initialRef} placeholder='Your username' />
              {!isErrorUsername ? (
                <FormHelperText>
                
                </FormHelperText>
              ) : (
                <FormErrorMessage>Username is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={isErrorTelegram}>
              <FormLabel>Telegram</FormLabel>
              <Input type='text' value={telegram} onChange={handleTelegramChange} placeholder='Your telegram' />
              {!isErrorTelegram ? (
                <FormHelperText>
                </FormHelperText>
              ) : (
                <FormErrorMessage>Telegram is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => handleRegister()}>
              Register
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}