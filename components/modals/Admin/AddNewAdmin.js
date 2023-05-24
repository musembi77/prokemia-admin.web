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
import Add_Admin from '../../../pages/api/auth/add_admin';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Get_Roles from '../../../pages/api/admin_roles/get_roles';

function AddNewAdmin({isaddnewadminModalvisible,setisaddnewadminModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show,setShow] = useState(false);
    const handleClick = ()=> setShow(!show);
    const [roles_data,set_roles_data]=useState([]);
    ////console.log(isaddingreviewgModalvisible);
    const toast = useToast();
    const cookies = new Cookies();
    let token = cookies.get('admin_token');

    const HandleModalOpen=()=>{
      if(isaddnewadminModalvisible !== true){
        ////console.log('damn')
      }else{

        onOpen();
        setisaddnewadminModalvisible(false)
      }
    }

    const [auth_role,set_auth_role]=useState("")

    useEffect(()=>{
      HandleModalOpen();
      if (!token){
        toast({
              title: '',
              description: `You need to signed in, to have access`,
              status: 'info',
              isClosable: true,
            });
        router.push("/")
      }else{
        let decoded = jwt_decode(token);
        //console.log(decoded);
        set_auth_role(decoded?.role);
        fetch_roles()
      }
    },[isaddnewadminModalvisible])

    const [user_name,set_user_name]=useState('')
    const [role,setrole]=useState('')
    const [admin_password,set_admin_password]=useState('')
    const [is_submitting,set_is_submitting]=useState(false)

    const payload = {
      user_name,
      role,
      admin_password,
      auth_role
    }

    const handle_add_new_Admin=async()=>{
      set_is_submitting(true)
      //console.log(payload)
      if (!user_name || !role || !admin_password){
        toast({
          title: '',
          description: 'All inputs are required',
          status: 'info',
          isClosable: true,
        });
        return ;
      }else{
        await Add_Admin(payload).then((response)=>{
          //console.log(response)
          if (response.status === 200){
            toast({
              title: '',
              description: response.data,
              status: 'success',
              isClosable: true,
            });
          }else{
            toast({
              title: 'Error while creating admin account',
              description: response.data,
              status: 'error',
              isClosable: true,
            })
          }
        }).catch((err)=>{
          toast({
              title: 'Error while creating admin account',
              description: err.response.data,
              status: 'error',
              isClosable: true,
            })
        })
        set_is_submitting(false)
        onClose();
        return;
      }
    }
    const fetch_roles=async()=>{
      Get_Roles().then((response)=>{
        set_roles_data(response.data);
        //console.log(response.data);
      }).catch((err)=>{
        console.log(err)
      })
    }
    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='24px'>Add New Staff</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
          <Stack spacing={4}>
            <Flex direction='column' gap='2'>
              <Text fontWeight='bold'>Username</Text>
              <Input type='text' placeholder='username' variant='filled' onChange={((e)=>{set_user_name(e.target.value)})}/>
            </Flex>
            <Text fontWeight='bold'>Assign Role</Text>
            <Select placeholder='Assign Role' onChange={((e)=>{setrole(e.target.value)})}>
                {roles_data?.map((role)=>{
                  return(
                    <option key={role?._id}>{role?.title}</option>    
                  )
                })}
            </Select>
            <Text fontWeight='bold'>Enter administrator password</Text>
            <InputGroup>
              <Input bg='#eee' p='1' type={show ? 'text' : 'password'} placeholder='administrator password' variant='filled' onChange={((e)=>{set_admin_password(e.target.value)})}/>
              <InputRightElement>
                  <Button onClick={handleClick}>
                  {show ? <VisibilityOff/> : <Visibility/>}
                  </Button>
              </InputRightElement>
            </InputGroup>
            <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_Admin} disabled={is_submitting?true:false}>Add new staff</Button>
          </Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default AddNewAdmin;