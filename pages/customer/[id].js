import React from 'react';
import {Flex,Text,Button} from '@chakra-ui/react';
import Header from '../../components/Header.js';

function Customer(){
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Text fontWeight='bold' fontSize='24px'>Customer Information</Text>
			<Flex gap='2' p='2' direction='column' bg='#eee' m='2' borderRadius='10px'>
				<Text>Customer Name</Text>
				<Text>Mobile</Text>
				<Text>Company</Text>
				<Text>Email</Text>
				<Text>Address</Text>
			</Flex>
			<Flex direction='column' p='2' gap='2'>
			<Button bg='#009393' color='#fff'>Contact</Button>
			<Button bg='#fff' color='red' border='1px solid red'>Suspend Account</Button>
			</Flex>
		</Flex>
	)
}

export default Customer