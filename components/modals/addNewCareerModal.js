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
    useToast, Checkbox, CheckboxGroup
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';

function AddnewCareer({isaddcareerModalvisible,setisaddcareerModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddcareerModalvisible !== true){
      }else{
        onOpen();
        setisaddcareerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddcareerModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add a new Career</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
				<Flex direction='column'>
					<Text>Title</Text>
					<Input type='text' placeholder='Title' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Description</Text>
					<Textarea type='text' placeholder='Description' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Requirements</Text>
					<Textarea type='text' placeholder='Requirements' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add Career</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddnewCareer;
