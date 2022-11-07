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

function AddNewProductModal({isaddnewproductModalvisible,setisaddnewProductModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isaddnewproductModalvisible !== true){
      }else{
        onOpen();
        setisaddnewProductModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddnewproductModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Add new Product</Text>
              	<Text fontSize='14px'>Please fill out all inputs below to add a new product</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
                <Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder='Name of product/Brand' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured by:</Text>
					<Input type='text' placeholder='manufactured by' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Distributed by</Text>
					<Input type='text' placeholder='Distributed by' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Description</Text>
					<Textarea type='text' placeholder='Description' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Chemical name</Text>
					<Input type='text' placeholder='Chemical Name' variant='filled'/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold'>Industry</Text>
					<Select variant='filled' placeholder='Select Industry'>
			          <option value='personalcare'>Personal Care</option>
			          <option value='hi&i'>H I & I</option>
			          <option value='building&construction'>Building and Construction</option>
			          <option value='food&nutrition'>Food and Nutrition</option>
			        </Select>
				</Flex>
				<Flex direction='column' gap='3'>
					<Text fontFamily='ClearSans-Bold'>Technology</Text>
					<Select variant='filled' placeholder='Select Technology'>
			          <option value='pharmaceuticals'>Pharmaceuticals</option>
			          <option value='cosmetics'>Cosmetics</option>
			        </Select>
				</Flex>
				<Flex direction='column'>
					<Text>Function</Text>
					<Input type='text' placeholder='Function' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Brand</Text>
					<Input type='text' placeholder='Brand' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>expiry date</Text>
					<Input type='date' placeholder='expiry date' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Data Sheet</Text>
					<Input type='file' placeholder='product data sheet' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Safety Data Sheet</Text>
					<Input type='file' placeholder='product data sheet' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Formulation Document</Text>
					<Input type='file' placeholder='Formulation Dcument' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Features & Benefits</Text>
					<Input type='text' placeholder='features and Benefits products' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Application</Text>
					<Input type='text' placeholder='use commas to separate different applications' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Packaging</Text>
					<Input type='text' placeholder='packaging infomation' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Storage & Handling</Text>
					<Input type='text' placeholder='storage and product handling information' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>List as Short on Expiry</Text>
					<Checkbox defaultChecked bg='#eee' p='2'>Short on Expiry</Checkbox>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add new Product</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddNewProductModal;
