import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterCustomerModal from '../components/modals/filterCustomer.js';
import Get_Clients from './api/clients/get_clients.js';

function Customers(){
	const router = useRouter();
	const [isfiltercustomerModalvisible,setisfiltercustomerModalvisible]=useState(false);
	const [clients_data, set_clients_data] = useState([]);
	useEffect(()=>{
		Get_Clients().then((response)=>{
			set_clients_data(response.data);
		})
	},[])
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
				<Input placeholder='search customers' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			
			<Flex direction='column' p='2' gap='2'>
				{clients_data.map((client_data)=>{
					return(
						<div key={client_data._id} >
							<Customer client_data={client_data}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Customers;

const Customer=({client_data})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#eee' borderRadius='5' p='2'>
			<Text fontWeight='bold'>{client_data.first_name},{client_data.last_name}</Text>
			<Text>{client_data.email_of_company}</Text>
			<Text>{client_data.company_name}</Text>
			<Text onClick={(()=>{router.push(`/customer/${client_data._id}`)})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}