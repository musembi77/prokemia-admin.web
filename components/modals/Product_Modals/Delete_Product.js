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
    Input,
    InputGroup,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Delete_Product from '../../../pages/api/Products/delete_product.js';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
const cookies = new Cookies();
let token = cookies.get('admin_token');

export default function Delete_Product_Modal({is_delete_product_Modalvisible,set_is_delete_product_Modalvisible,product_data}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name,set_name]=useState('')
    const router = useRouter();
    const toast = useToast();
    const cookies = new Cookies();
    let token = cookies.get('admin_token');
    const [auth_role,set_auth_role]=useState("")
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(is_delete_product_Modalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        set_is_delete_product_Modalvisible(false)
      }
    }

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
        set_auth_role(decoded?.role)
      }
    },[is_delete_product_Modalvisible])
	// }

    const handle_Delete_Product=async()=>{
        //console.log(product_data?.name_of_product,name)
    	if (product_data?.name_of_product === name){
        const payload = {
          _id: product_data?._id,
          auth_role
        }
    		await Delete_Product(payload).then(()=>{
                toast({
                  title: '',
                  description:`${product_data?.name_of_product} has been deleted`,
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
							<Text>Enter the name of Product below,<span style={{color:"red",padding:'5px',backgroundColor:"#eee"}}>{product_data?.name_of_product}</span> to complete deletion.</Text>
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