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
import Delete_Product from '../../../pages/api/Products/delete_product.js';
import {useRouter} from 'next/router'

export default function Decline_Product({isdeleteproductModalvisible,setisdeleteproductModalvisible,id,payload}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name,set_name]=useState('')
    const router = useRouter();
    const toast = useToast();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(isdeleteproductModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setisdeleteproductModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isdeleteproductModalvisible])

 //    const payload = {
	// 	_id : id.id
	// }

    const handle_Delete_Product=async()=>{
        console.log(payload?.name_of_product,name)
    	if (payload?.name_of_product === name){
    		await Delete_Product(payload).then(()=>{
                toast({
                  title: '',
                  description:`${payload?.name_of_product} has been deleted`,
                  status: 'success',
                  isClosable: true,
                });
				router.back()
			}).catch((err)=>{
                console.log(err)
                toast({
                  title: '',
                  description: err.response?.data,
                  status: 'error',
                  isClosable: true,
                });
            })
    	}else{
            toast({
              title: '',
              description:`Enter the correct product name to complete deletion`,
              status: 'info',
              isClosable: true,
            });
    	}
		
	}
    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='24px' color='red'>Delete Product</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<Text>By Deleting this product,the information of the product will be permanently erased.</Text>
							<Text>Enter the name of Product below,<span style={{color:"red",padding:'5px',backgroundColor:"#eee"}}>{payload?.name_of_product}</span> to complete deletion.</Text>
							<InputGroup>
								<Input type='text' placeholder='name of product' variant='filled' onChange={((e)=>{set_name(e.target.value)})}/>
							</InputGroup>
							<Button bg='red' borderRadius='0' color='#fff' onClick={handle_Delete_Product}>Delete Product</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}