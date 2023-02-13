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
import Delete_Admin_Account from '../../pages/api/auth/delete_admin_account.js';

function RemoveAdminModal({isremoveModalvisible,setisremoveModalvisible,admin_data}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    
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

    const [confirm_name,set_confirm_name]=useState('')
    const [name,set_name]=useState();

    const payload = {
        _id:admin_data?._id
    }    

    const handle_delete_admin_account=async()=>{
        console.log(payload)
      if (confirm_name === admin_data?.user_name){
        await Delete_Admin_Account(payload).then(()=>{
            toast({
              title: '',
              description: `${admin_data?.user_name} account has been deleted`,
              status: 'info',
              isClosable: true,
            });
          }).catch((err)=>{
            console.log(err)
            toast({
                      title: '',
                      description: err.response.data,
                      status: 'error',
                      isClosable: true,
                  })
          })
      }else{
        toast({
          title: '',
          description: 'Enter the right name to delete this account',
          status: 'error',
          isClosable: true,
        })
      }
      onClose()
    }

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
							<Text>Enter the name of Account Holder: <span style={{color:'red'}}>{admin_data?.user_name}</span> below, to complete suspension.</Text>
							<InputGroup>
								<Input type='text' placeholder='name of user' variant='filled' onChange={((e)=>{set_confirm_name(e.target.value)})}/>
							</InputGroup>
							<Button bg='red' borderRadius='0' color='#fff' onClick={handle_delete_admin_account}>Remove</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default RemoveAdminModal;