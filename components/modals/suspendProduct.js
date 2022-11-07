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

function SuspendProductModal({issuspendproductModalvisible,setissuspendproductModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(issuspendproductModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setissuspendproductModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[issuspendproductModalvisible])

    const [body,setBody]=useState('')

    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='24px' color='red'>Suspend Product</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<Text>By suspending this product,the information of the product will not be visible.</Text>
							<Text>Enter the name of Product below, to complete suspension.</Text>
							<InputGroup>
								<Input type='text' placeholder='name of product' variant='filled'/>
							</InputGroup>
							<Button bg='red' borderRadius='0' color='#fff'>Suspend Product.</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default SuspendProductModal;