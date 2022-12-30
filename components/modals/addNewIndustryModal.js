//modules imports
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
import Add_Industry from '../../pages/api/controls/add_new_industry.js';

function AddnewIndustry({isaddindustryModalvisible,setisaddindustryModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const HandleModalOpen=()=>{
      if(isaddindustryModalvisible !== true){
      }else{
        onOpen();
        setisaddindustryModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddindustryModalvisible])

    const [title,set_title]=useState('')
    const [image,set_image]=useState('')

    const payload = {
      title:            title,
      cover_image:        image,
    }

    const handle_add_new_Industry=()=>{
      Add_Industry(payload).then((response)=>{
            if (response.status === 200){
            return toast({
              title: '',
              description: 'Successfully added a new Industry',
              status: 'success',
              isClosable: true,
            });
          }
          else{
            return toast({
              title: 'Error while adding a new Industry',
              description: response.data,
              status: 'error',
              isClosable: true,
            })
          }
        })
      onClose()
    }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Add new Industry</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Flex direction='column'>
                <Text>Industry</Text>
                <Input type='text' placeholder='Industry' variant='filled' onChange={((e)=>{set_title(e.target.value)})}/>
              </Flex>
              <Flex direction='column'>
                <Text>Industry_image_cover</Text>
                <Input type='file' placeholder='Industry_image_cover' variant='filled' onChange={((e)=>{set_image(e.target.value)})}/>
              </Flex>
              <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_Industry}>Add Industry</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}   

export default AddnewIndustry;
