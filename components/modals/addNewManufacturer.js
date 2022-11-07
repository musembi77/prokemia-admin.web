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
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';

function AddNewManufacturerModal({isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewmanufacturerModalvisible !== true){
      }else{
        onOpen();
        setisaddnewmanufacturerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewmanufacturerModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add new Manufacturer</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
                <Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder='Name of Manufacturer' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Email:</Text>
					<Input type='Email' placeholder='Email' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Mobile</Text>
					<Input type='tel' placeholder='Mobile' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add new Manufacturer</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddNewManufacturerModal;


