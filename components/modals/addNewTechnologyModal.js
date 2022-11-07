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

function AddnewTechnology({isaddtechnologyModalvisible,setisaddtechnologyModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddtechnologyModalvisible !== true){
      }else{
        onOpen();
        setisaddtechnologyModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddtechnologyModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add new Technology</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
				<Flex direction='column'>
					<Text>Technology</Text>
					<Input type='text' placeholder='Technology' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add Technology</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddnewTechnology;
