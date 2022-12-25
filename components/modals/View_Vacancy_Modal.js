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
import Edit_Vacancy from '../../pages/api/careers/edit_vacancy';

function View_Vacancy({is_view_vacancy_Modalvisible,set_is_view_vacancy_Modalvisible,item}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const HandleModalOpen=()=>{
      if(is_view_vacancy_Modalvisible !== true){
      }else{
        onOpen();
        set_is_view_vacancy_Modalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[is_view_vacancy_Modalvisible])

    const [title,set_title]=useState(item?.title)
    const [description,set_description]=useState(item?.description)
    const [requirements,set_requirements]=useState(item?.requirements)
    const [link,setlink]=useState(item?.link)
    const [company,setcompany]=useState(item?.company)
    const [status,setstatus]=useState(item?.status)
    const [valid_till,setvalid_till]=useState(item?.valid_till)

    const payload = {
      _id : item._id,
      title,
      description,
      requirements,
      link,
      company,
      status,
      valid_till
    }
    //console.log(payload)
    const Handle_edit_vacancy=()=>{
      console.log(payload)
      if (!title || !description || !requirements || !link || !company || !status || !valid_till)
        return alert("all inputs are required")
      
      Edit_Vacancy(payload).then((response)=>{
      	onClose()
      	set_is_view_vacancy_Modalvisible(false)
        if (response.status === 200){
          return toast({
                    title: '',
                    description: 'Successfully edited this vacancy',
                    status: 'success',
                    isClosable: true,
                  });
        }
        else{
          return toast({
                          title: 'Error while editing vacancy.',
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
			<Text>View Career</Text>
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
			<Stack spacing={4}>
			<Flex direction='column'>
			  <Text>Title</Text>
			  <Input type='text' placeholder={item?.title} variant='filled' onChange={((e)=>{set_title(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>Description</Text>
			  <Textarea type='text' placeholder={item?.description} variant='filled' onChange={((e)=>{set_description(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>Requirements</Text>
			  <Textarea type='text' placeholder={item?.requirements} variant='filled' onChange={((e)=>{set_requirements(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>Link to company</Text>
			  <Textarea type='text' placeholder={item?.link} variant='filled' onChange={((e)=>{setlink(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>Name of company</Text>
			  <Textarea type='text' placeholder={item?.company} variant='filled' onChange={((e)=>{setcompany(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>Status of the career</Text>
			  <Textarea type='text' placeholder={item?.status} variant='filled' onChange={((e)=>{setstatus(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
			  <Text>post is valid till</Text>
			  <Input type='date' placeholder={item?.valid_till} variant='filled' onChange={((e)=>{setvalid_till(e.target.value)})}/>
			</Flex>
			<Button bg='#009393' borderRadius='0' color='#fff' onClick={Handle_edit_vacancy}>Edit Vacancy</Button>
			</Stack>
			</ModalBody>
			</ModalContent>
			</Modal>
		</>
	)
}

export default View_Vacancy;
