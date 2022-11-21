import React,{useState}from 'react';
import {Flex,Text,Button,Input,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import Product from '../components/Product.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductModal from '../components/modals/filterProduct.js';
import OrderItemModal from '../components/modals/OrderItemModal.js';
import {useRouter} from 'next/router';

function Orders(){
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	const [isvieworderModalvisible,setisvieworderModalvisible]=useState(false);
	return(
		<Flex direction='column'>
			<FilterProductModal isfilterproductModalvisible={isfilterproductModalvisible} setisfilterproductModalvisible={setisfilterproductModalvisible}/>
			<OrderItemModal isvieworderModalvisible={isvieworderModalvisible} setisvieworderModalvisible={setisvieworderModalvisible}/>
			<Header/>
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Orders</Text>
			<Flex gap='2' p='2' align='center'>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
					<option>by Date</option>
					<option>Pending</option>
					<option>Disursed</option>
					<option>Completed</option>
				</Select>
				<Flex gap='2' p='2' flex='1'>
					<Input placeholder='search Orders by status, Id' bg='#fff' />
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
			</Flex>
			
			<Flex wrap='flex' direction='column' p='2' gap='2' mb='2' overflowY='scroll' h='80vh'>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
			</Flex>
		</Flex>
	)
}

export default Orders;

const OrderItem=({setisvieworderModalvisible})=>{
	const router = useRouter();
	return(
		<Flex _hover={{transform:"scale(1.01)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} boxShadow='lg' p='2' bg='#fff' onClick={(()=>{router.push('/order/1')})} cursor='pointer' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
			<Text fontSize='20px' fontWeight='bold'>Order Id: 28739842</Text>
			<Text>Product Name: Cereal</Text>
			<Text>Unit Price: 200</Text>
			<Text>Volume: 1000</Text>
			<Text>Total: 200,000</Text>	
			<Text>Email of Client: joan@jussup.com</Text>	
			<Text>date: 21-11-2022</Text>	
			<Text>Order Status: <span style={{color:'orange'}}>Pending</span></Text>	
		</Flex>
	)
}
