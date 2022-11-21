import React,{useState}from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../components/Header.js'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useRouter} from 'next/router';

function Order(){
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Flex p='1' direction='column' gap='2'>
				<Flex boxShadow='lg' p='2' bg='#fff' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
					<Text fontSize='20px' fontWeight='bold'>Order Id: 28739842</Text>
					<Text>Product Name: Cereal</Text>
					<Text>Unit Price: 200</Text>
					<Text>Volume: 1000</Text>
					<Text>Total: 200,000</Text>
					<Text>Email of Client: joan@jussup.com</Text>	
					<Text>date: 21-11-2022</Text>	
					<Text>Order Status: <span style={{color:'orange'}}>Pending</span></Text>	
				</Flex>
				<Flex justify='center' gap='2'>
					<Button bg='#009393' color='#fff' flex='1'>Create Invoice</Button>
					<Button bg='#000' color='#fff' flex='1'>Edit Order</Button>
				</Flex>
				<Button bg='#fff' color='red' border='1px solid red'>Reject Order</Button>
			</Flex>
		</Flex>
	)
}

export default Order;