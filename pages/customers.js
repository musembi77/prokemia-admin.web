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
	const [filter_active, set_filter_active] = useState(false);
	const [status,set_status] = useState(false)
	const [region,set_region] = useState('')
	const [date,set_date] = useState('')

	const filter_obj = {
		suspension_status : status
	}
	useEffect(()=>{
		Get_Clients().then((response)=>{
			console.log(response.data)
			set_clients_data(response.data);
		})
	},[])

	function bouncer(arr) {
	// Don't show a false ID to this bouncer.
	function a(b) {
	  if(b.suspension_status !== true) {
	    return b.suspension_status;
	  }
	}

	arr = arr.filter(a);
	return arr;
	}
	//let client_data_result = arr?.filter(item => !item.suspension_status )
	console.log(bouncer(clients_data))
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column'>
				<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Customers</Text>
				{filter_active? 
					<FilterBar set_filter_active={set_filter_active} set_status={set_status} set_region={set_region} set_date={set_date}/>
					: null
				}
				<Flex gap='2' p='2' align='center'>
					<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
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
					{clients_data?.map((client_data)=>{
						return(
							<div key={client_data._id} >
								<Customer client_data={client_data}/>
							</div>
						)
					})}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Customers;

const Customer=({client_data})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#fff' borderRadius='5' p='2' boxShadow='lg' cursor='pointer'>
			<Text fontWeight='bold' fontSize='24px'>{client_data.first_name},{client_data.last_name}</Text>
			<Text>{client_data.email_of_company}</Text>
			<Text>{client_data.company_name}</Text>
			<Text onClick={(()=>{router.push(`/customer/${client_data._id}`)})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_date,set_status,set_region})=>{
	return(
			<Flex color='#fff' direction='column' gap='3' p='4' w='50vw' h='90vh' bg='#090F14' position='absolute' top='75px' left='0px' zIndex='2' boxShadow='dark-lg'>
				<Flex justify='space-between' p='2'>
					<Text>Filter results</Text>
					<Text cursor='pointer' onClick={(()=>{set_filter_active(false)})}>Close</Text>
				</Flex>
				<Flex direction='column' >
					<Text>Suspension status</Text>
					<Select placeholder='Suspension status' bg='#fff' color='#000' onChange={((e)=>{set_status(e.target.value)})}>
						<option value={'false'} >Suspended</option>
						<option value={'true'} >Active</option>
						<option value={''} >All</option>
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Region</Text>
					<Input type='text' placeholder='Region' variant='filled' bg='#fff' color='#fff'/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text>Joined date</Text>
					<Input type='date' placeholder='expiry date' variant='filled'  color='#000'/>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff'>Filter Results</Button>
			</Flex>
	)
}