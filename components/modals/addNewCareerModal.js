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
import Add_vacancy from '../../pages/api/careers/add_vacancy';

function AddnewCareer({isaddcareerModalvisible,setisaddcareerModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const HandleModalOpen=()=>{
      if(isaddcareerModalvisible !== true){
      }else{
        onOpen();
        setisaddcareerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isaddcareerModalvisible])

    const [title,set_title]=useState('')
    const [description,set_description]=useState('')
    const [requirements,set_requirements]=useState('')
    const [link,setlink]=useState('')
    const [company,setcompany]=useState('')
    const [status,setstatus]=useState('')
    const [valid_till,setvalid_till]=useState('')

    const payload = {
      title,
      description,
      requirements,
      link,
      company,
      status,
      valid_till
    }

    const Handle_create_new_vacancy=()=>{
      console.log(payload)
      if (!title || !description || !requirements || !link || !company || !status || !valid_till)
        return alert("all inputs are required")
      
      Add_vacancy(payload).then((response)=>{
        onClose()
        if (response.status === 200){
          return toast({
                    title: '',
                    description: 'Successfully created a new vacancy',
                    status: 'success',
                    isClosable: true,
                  });
        }
        else{
          return toast({
                          title: 'Error while creating a vacancy post',
                          description: response.data,
                          status: 'error',
                          isClosable: true,
                        })
        }

      })
    }
    return (
            <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text>Add a new Career</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4}>
                    <Flex direction='column'>
                      <Text>Title</Text>
                      <Input type='text' placeholder='Title' variant='filled' onChange={((e)=>{set_title(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Description</Text>
                      <Textarea type='text' placeholder='Description' variant='filled' onChange={((e)=>{set_description(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Requirements</Text>
                      <Textarea type='text' placeholder='Requirements' variant='filled' onChange={((e)=>{set_requirements(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Link to company</Text>
                      <Textarea type='text' placeholder='Link' variant='filled' onChange={((e)=>{setlink(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Name of company</Text>
                      <Textarea type='text' placeholder='name of company' variant='filled' onChange={((e)=>{setcompany(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>Status of the career</Text>
                      <Textarea type='text' placeholder='status' variant='filled' onChange={((e)=>{setstatus(e.target.value)})}/>
                    </Flex>
                    <Flex direction='column'>
                      <Text>post is valid till</Text>
                      <Input type='date' placeholder='Valid till' variant='filled' onChange={((e)=>{setvalid_till(e.target.value)})}/>
                    </Flex>
                    <Button bg='#009393' borderRadius='0' color='#fff' onClick={Handle_create_new_vacancy}>Add Career</Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
            </>
            )
            }   

export default AddnewCareer;
