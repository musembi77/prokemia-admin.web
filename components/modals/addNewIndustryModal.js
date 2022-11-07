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

function AddnewIndustry({isaddindustryModalvisible,setisaddindustryModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const [body,setBody]=useState('')

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
					<Input type='text' placeholder='Industry' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Add Industry</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default AddnewIndustry;
