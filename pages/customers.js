import React,{useState}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterCustomerModal from '../components/modals/filterCustomer.js';

function Customers(){
	const router = useRouter();
	const [isfiltercustomerModalvisible,setisfiltercustomerModalvisible]=useState(false);
	return(
		<Flex direction='column'>
			<FilterCustomerModal isfiltercustomerModalvisible={isfiltercustomerModalvisible} setisfiltercustomerModalvisible={setisfiltercustomerModalvisible}/>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Customers</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{setisfiltercustomerModalvisible(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
					<option></option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search customers' bg='#fff' Flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>

			<Flex direction='column'>
				<Customer/>
				<Customer/>
			</Flex>
		</Flex>
	)
}

export default Customers;

const Customer=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#eee' borderRadius='5' p='2'>
			<Text fontWeight='bold'>Name</Text>
			<Text>Email</Text>
			<Text>Company</Text>
			<Text onClick={(()=>{router.push('/customer/1')})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}