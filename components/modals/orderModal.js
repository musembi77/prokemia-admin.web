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
    Input,Image,
    Select,
    InputGroup,Heading,
    Stack,
    useToast,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ViewOrderModal({isvieworderModalvisible,setisViewOrderModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isvieworderModalvisible !== true){
      }else{
        onOpen();
        setisViewOrderModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isvieworderModalvisible])

    const [body,setBody]=useState('')

    return (
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    <Text>View Order</Text>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={2}>
                        <AccountCircleIcon style={{fontSize:'150px'}}/>
                        <Flex direction='column' gap='2'>
                        <Text fontSize='24px' color='#009393'>Name: Major</Text>
                        <Text>Company: Sahol Ind</Text>
                        <Text>Industry: Agriculture</Text>
                        <Button bg='#009393' color='#fff'><EmailIcon/>Email</Button>
                      </Flex>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
              </>
      )
}   

export default ViewExpertModal;

