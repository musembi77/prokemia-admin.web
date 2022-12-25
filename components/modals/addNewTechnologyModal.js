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
//api-calls
import Add_Technology from '../../pages/api/controls/add_new_technology.js';

function AddnewTechnology({isaddtechnologyModalvisible,setisaddtechnologyModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const HandleModalOpen=()=>{
      if(isaddtechnologyModalvisible !== true){
      }else{
        onOpen();
        setisaddtechnologyModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddtechnologyModalvisible])

    const [title,set_title]=useState('')
    const [image,set_image]=useState('')

    const payload = {
      title:            title,
      cover_image:        image,
    }

    const handle_add_new_technology=()=>{
    
    console.log(payload)
      if (!title || !image )
        toast({
          title: '',
          description: 'All inputs are required',
          status: 'info',
          isClosable: true,
        });
      else{
        Add_Technology(payload).then((response)=>{
            if (response.status === 200){
            return toast({
              title: '',
              description: 'Successfully added a new Technology',
              status: 'success',
              isClosable: true,
            });
          }
          else{
            return toast({
              title: 'Error while adding a new Technology',
              description: response.data,
              status: 'error',
              isClosable: true,
            })
          }
        })
      }
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>Add new Technology</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Flex direction='column'>
                  <Text>Technology</Text>
                <Input type='text' placeholder='Technology' variant='filled' onChange={((e)=>{set_title(e.target.value)})}/>
                </Flex>
                <Flex direction='column'>
                  <Text>technology_image_cover</Text>
                  <Input type='file' placeholder='technology_image_cover' variant='filled' onChange={((e)=>{set_image(e.target.value)})}/>
                </Flex>
                <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_technology}>Add Technology</Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}   

export default AddnewTechnology;
