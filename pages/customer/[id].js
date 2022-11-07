import React,{useState}from 'react';
import {Flex,Text,Button} from '@chakra-ui/react';
import Header from '../../components/Header.js';
import SuspendAccountModal from '../../components/modals/suspendAccount.js';

function Customer(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);

	return(
		<Flex direction='column' gap='2'>
		<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible}/>
			<Header />
			<Text fontWeight='bold' fontSize='28px'>Customer Information</Text>
			<Flex gap='2' p='2' direction='column' bg='#eee' m='2' borderRadius='10px'>
				<Text fontSize='24px'>Customer Name</Text>
				<Text>Mobile: 0759233322</Text>
				<Text>Company: unilever</Text>
				<Text>Email: Unilever@unilever.co.ke</Text>
				<Text>Address: Juja, Kenya</Text>
				<Text>Joined in : 03-11-2022</Text>
			</Flex>
			<Flex direction='column' m='2'>
				<Text fontSize='20px' fontWeight='bold'>Recent Searches</Text>
				<Flex bg='#eee' p='2' borderRadius='5' direction='column'>
					<Text>Pharmaceuticals</Text>
					<Text>Adhesives</Text>
				</Flex>
			</Flex>
			<Flex direction='column' p='2' gap='2'>
			<Button bg='#009393' color='#fff'>Contact</Button>
			<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
			</Flex>
		</Flex>
	)
}

export default Customer
