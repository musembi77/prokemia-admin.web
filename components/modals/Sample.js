import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Flex,
    Center,
    Textarea,
    Input,
    Select,
    InputGroup,Heading,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';

function SampleModal({issampleModalvisible,setissampleModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(issampleModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setissampleModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[issampleModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Request Sample</Text>
              	<Text fontSize='14px'>Please fill out the form below to prepare your request</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
                {/* <Text>Confirm Details to start this great journey</Text> */}
                <InputGroup>
					<Input type='text' placeholder='Describe Intended Use for this product' variant='flushed'/>
				</InputGroup>
				<InputGroup>
					<Input type='text' placeholder='Expected volume or amount of samples' variant='flushed'/>
				</InputGroup>
				<Select variant='filled' placeholder='Select Unit'>
		          <option value='kg'>Kilograms</option>
		          <option value='gallons'>Gallons</option>
		        </Select>
                <Button bg='#009393' borderRadius='0' color='#fff'>Submit request</Button>
                </Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default SampleModal;