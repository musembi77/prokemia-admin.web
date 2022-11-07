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

function FilterManufacturer({isfiltermanufacturerModalvisible,setisfiltermanufacturerModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{
      if(isfiltermanufacturerModalvisible !== true){
      }else{
        onOpen();
        setisfiltermanufacturerModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isfiltermanufacturerModalvisible])

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
					<Text>Joined date</Text>
					<Input type='date' placeholder='expiry date' variant='filled'/>
				</Flex>
				<Flex direction='column'>
					<Text>Premium Account</Text>
					<Checkbox defaultChecked bg='#eee' p='2'>Premium Account</Checkbox>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff'>Filter Results</Button>
			</Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   

export default FilterManufacturer;
