//modules imports
import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//components imports
import Header from '../components/Header.js'
//icons imports
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import Person2Icon from '@mui/icons-material/Person2';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//api-calls imports
import Get_SalesPeople from '../pages/api/salespeople/get_salespeople.js';

function SalesPersons(){
	const router = useRouter()
	const [salespeople_data, set_salespeople_data]=useState([]);

	useEffect(()=>{
		Get_SalesPeople().then((response)=>{
			console.log(response.data)
			set_salespeople_data(response.data);
		})
	},[])
	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >SalesPersons</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4'>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
					<option>Annonymous</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search salespersons' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex gap='2' w='' direction='column' bg='#eee' borderRadius='5' m='2' p='2' h=''>
				{salespeople_data?.map((salesperson_data)=>{
					return(
						<div key={salesperson_data._id} >
							<SalesPerson salesperson_data={salesperson_data}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default SalesPersons;

const SalesPerson=({salesperson_data})=>{
	const router = useRouter()
	return(
		<Flex cursor='pointer' onClick={(()=>{router.push(`/salesperson/${salesperson_data._id}`)})} bg='#fff' p='2' borderRadius='5' boxShadow='lg' w='	' cursor='pointer' _hover={{boxShadow:"dark-lg",transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}}>
			<Person2Icon style={{fontSize:'80px',textAlign:'center'}}/>
			<Flex direction='column'>
				<Text fontWeight='bold'>Name: {salesperson_data.first_name} {salesperson_data.last_name}</Text>
				<Text >Email: {salesperson_data.email_of_salesperson}</Text>
				<Text>Mobile: {salesperson_data.mobile_of_salesperson}</Text>
			</Flex>
		</Flex>
	)
}