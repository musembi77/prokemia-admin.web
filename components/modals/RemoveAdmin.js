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

function RemoveAdminModal({isremoveModalvisible,setisremoveModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(isremoveModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setisremoveModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isremoveModalvisible])

    const [body,setBody]=useState('')

    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='24px' color='red'>Remove Admin Account</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<Text>By removing this account, the user will not have access to use the service and the platform.</Text>
							<Text>Enter the name of Account Holder: <span style={{color:'red'}}>User</span> below, to complete suspension.</Text>
							<InputGroup>
								<Input type='text' placeholder='name of user' variant='filled'/>
							</InputGroup>
							<Button bg='red' borderRadius='0' color='#fff'>Remove</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default RemoveAdminModal;