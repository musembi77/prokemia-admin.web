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

function OrderItemModal({isvieworderModalvisible,setisvieworderModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isvieworderModalvisible !== true){
      }else{
        onOpen();
        setisvieworderModalvisible(false)
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
						<Text>Order Item - #01298</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex gap='3' direction='column'>		
							<Flex gap='2'>
								<Text>Issuer: </Text>
								<Text>Sammy</Text>
							</Flex>
							<Flex gap='2'>
								<Text>Client: </Text>
								<Text>Unilever</Text>
							</Flex>
							<Flex gap='2'>
								<Text>Client-Email: </Text>
								<Text>sales@Unilever.co.ke</Text>
							</Flex>
							<Flex gap='2'>
								<Text>Volume: </Text>
								<Text>2000</Text>
							</Flex>
							<Flex gap='2'>
								<Text>Price/Item: </Text>
								<Text>120</Text>
							</Flex>
							<Flex gap='2'>
								<Text>Service Fee: </Text>
								<Text>20</Text>
							</Flex>
							<Button bg='#009393' color='#fff'>Create Invoice</Button>
						</Flex>
					</ModalBody>
				</ModalContent>
				</Modal>
			</>
      )
}   

export default OrderItemModal;
