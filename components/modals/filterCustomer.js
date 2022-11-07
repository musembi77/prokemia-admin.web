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

function FilterCustomer({isfiltercustomerModalvisible,setisfiltercustomerModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isfiltercustomerModalvisible !== true){
      }else{
        onOpen();
        setisfiltercustomerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isfiltercustomerModalvisible])

    const [body,setBody]=useState('')

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
              	<Text>Filter results</Text>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={4}>
				<Flex direction='column'>
					<Text>Region</Text>
					<Input type='text' placeholder='Region' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Joined date</Text>
					<Input type='date' placeholder='expiry date' variant='filled'/>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Filter Results</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default FilterCustomer;
