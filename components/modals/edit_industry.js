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
    Image,
    InputGroup,Heading,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Edit_Industry from '../../pages/api/controls/edit_industry';


function Edit_Industry_Modal({
    is_edit_industry_Modalvisible,
    set_is_edit_industry_Modalvisible,
    item,
  }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(is_edit_industry_Modalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        set_is_edit_industry_Modalvisible(false)
      }
    }

    const [edited_title,set_edited_title]=useState('');

    useEffect(()=>{
      HandleModalOpen();
    },[is_edit_industry_Modalvisible])

    
    const payload = {
    	_id: item?._id,
    	title:edited_title
    }
    const handle_edit_industry=async()=>{
      await Edit_Industry(payload).then(()=>{
        alert("Industry edited successfuly")
      })
    }
    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='32px'>Edit Industry</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<Image src={item?.cover_image} alt='industry photo' h='300px' w='100%' objectFit='cover'/>
							<Text>{item?.title}</Text>
							<Text mt='2'>Edit Title</Text>
							<InputGroup>
								<Input type='text' placeholder={item?.title} variant='filled' onChange={((e)=>{set_edited_title(e.target.value)})}/>
							</InputGroup>
							<Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_edit_industry}>Edit_Industry</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default Edit_Industry_Modal;