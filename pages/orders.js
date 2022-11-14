import React,{useState}from 'react';
import {Flex,Text,Button,Input,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import Product from '../components/Product.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductModal from '../components/modals/filterProduct.js';
import OrderItemModal from '../components/modals/OrderItemModal.js';

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
				</Select>
				<Flex gap='2' p='2' flex='1'>
					<Input placeholder='search Orders' bg='#fff' />
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
			</Flex>
			
			<Flex wrap='Wrap' direction='column'>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
				<OrderItem setisvieworderModalvisible={setisvieworderModalvisible}/>
			</Flex>
		</Flex>
	)
}

export default Orders;

const OrderItem=({setisvieworderModalvisible})=>{
	return(
		<Flex bg='#eee' borderRadius='5px' direction='column' m='2' p='2' gap='1'>		
			<Flex gap='2'>
				<Text>Issuer: </Text>
				<Text>Sammy</Text>
			</Flex>
			<Flex gap='2'>
				<Text>Client: </Text>
				<Text>Unilever</Text>
			</Flex>
			<Flex gap='2'>
				<Text>Volume: </Text>
				<Text>2000</Text>
			</Flex>
			<Flex gap='2'>
				<Text>Price/Item: </Text>
				<Text>100</Text>
			</Flex>
			<Button bg='#000' color='#fff' onClick={(()=>{setisvieworderModalvisible(true)})}>View</Button>
		</Flex>
	)
}
