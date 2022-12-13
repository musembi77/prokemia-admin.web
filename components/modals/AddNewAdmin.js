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
    InputGroup,Input,InputRightElement,
    Select,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import Add_Admin from '../../pages/api/auth/add_admin';

function AddNewAdmin({isaddnewadminModalvisible,setisaddnewadminModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show,setShow] = useState(false);
    const handleClick = ()=> setShow(!show);
    //console.log(isaddingreviewgModalvisible);
    const toast = useToast();

    const HandleModalOpen=()=>{
      if(isaddnewadminModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setisaddnewadminModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewadminModalvisible])

    const [user_name,set_user_name]=useState('')
    const [role,setrole]=useState('')
    const [user_password,set_user_password]=useState('')
    const [admin_password,set_admin_password]=useState('')

    const payload = {
      user_name,
      role,
      user_password,
      admin_password
    }

    const handle_add_new_Admin=()=>{
      console.log(payload)
      if (!user_name || !user_password || !role || !admin_password)
        toast({
          title: '',
          description: 'All inputs are required',
          status: 'info',
          isClosable: true,
        });

      Add_Admin(payload).then((response)=>{
        if (response.status === 200){
          return toast({
                    title: '',
                    description: 'Successfully created a new admin user',
                    status: 'success',
                    isClosable: true,
                  });
        }
        else{
          return toast({
                          title: 'Error while creating admin account',
                          description: response.data,
                          status: 'error',
                          isClosable: true,
                        })
        }
      })
    }
    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='24px'>Add New Admin</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
          <Stack spacing={4}>
            <Flex direction='column' gap='2'>
              <Text>UserName</Text>
              <Input type='text' placeholder='user_name' variant='filled' onChange={((e)=>{set_user_name(e.target.value)})}/>
            </Flex>
            <Text>Assign Role</Text>
            <Select placeholder='Select Admin Role' onChange={((e)=>{setrole(e.target.value)})}>
                <option>Expert</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>IT</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Finance</option>
                <option>Legal</option>
            </Select>
            <Text>Enter User Password</Text>
            <InputGroup>
                <Input bg='#eee' p='1' type={show ? 'text' : 'password'} placeholder='Enter User Password' variant='filled' onChange={((e)=>{set_user_password(e.target.value)})}/>
                <InputRightElement>
                    <Button onClick={handleClick}>
                    {show ? <VisibilityOff/> : <Visibility/>}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Text>Enter Admin Password</Text>
            <InputGroup>
              <Input bg='#eee' p='1' type={show ? 'text' : 'password'} placeholder='Enter Admin Password' variant='filled' onChange={((e)=>{set_admin_password(e.target.value)})}/>
              <InputRightElement>
                  <Button onClick={handleClick}>
                  {show ? <VisibilityOff/> : <Visibility/>}
                  </Button>
              </InputRightElement>
            </InputGroup>
            <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_Admin}>Add New Admin User</Button>
          </Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default AddNewAdmin;