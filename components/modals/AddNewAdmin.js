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

function AddNewAdmin({isaddnewadminModalvisible,setisaddnewadminModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show,setShow] = useState(false);
    const handleClick = ()=> setShow(!show);
    //console.log(isaddingreviewgModalvisible);

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

    const [body,setBody]=useState('')

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
                                <Input type='text' placeholder='Name of Admin' variant='filled'/>
                            </Flex>
                            <Text>Assign Role</Text>
                            <Select placeholder='Select Admin Role'>
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
                                <Input bg='#eee' p='1' type={show ? 'text' : 'password'} placeholder='Enter User Password' variant='filled'/>
                                <InputRightElement>
                                    <Button onClick={handleClick}>
                                    {show ? <VisibilityOff/> : <Visibility/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Text>Enter Admin Password</Text>
                            <InputGroup>
                                <Input bg='#eee' p='1' type={show ? 'text' : 'password'} placeholder='Enter Admin Password' variant='filled'/>
                                <InputRightElement>
                                    <Button onClick={handleClick}>
                                    {show ? <VisibilityOff/> : <Visibility/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
							<Button bg='#009393' borderRadius='0' color='#fff'>Add New Admin User</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default AddNewAdmin;