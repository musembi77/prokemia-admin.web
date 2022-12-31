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
	const [filter_active, set_filter_active] = useState(false);
	const [status,set_status] = useState('')
	const [search_query,set_search_query] = useState('')
	console.log(status)
	useEffect(()=>{
		console.log(status)
		Get_SalesPeople().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result_data = data?.filter((item) => item?.email_of_salesperson.toLowerCase().includes(search_query) || item?.company_name.toLowerCase().includes(search_query) || item?.first_name.toLowerCase().includes(search_query) || item?.last_name.toLowerCase().includes(search_query)).sort((a, b) => a.first_name.localeCompare(b.first_name))
			if(status === 'true'){
				const result = result_data?.filter((item) => !item.suspension_status)
				console.log(result)
				set_salespeople_data(result);
			}else{
				// const result = result_data?.filter((item) => item.suspension_status)
				console.log(result_data)
				set_salespeople_data(result_data);
			}
			
		})
	},[status,search_query])
	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >SalesPersons</Text>
			{filter_active? 
				<FilterBar set_filter_active={set_filter_active} set_status={set_status}/>
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
				<Input placeholder='search customers' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex gap='2' w='' direction='column' bg='#eee' borderRadius='5' m='2' p='2' h=''>
				{salespeople_data?.map((salesperson_data)=>{
					return(
						<div key={salesperson_data?._id} >
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
		<Flex cursor='pointer' onClick={(()=>{router.push(`/salesperson/${salesperson_data?._id}`)})} bg='#fff' p='2' borderRadius='5' boxShadow='lg' _hover={{boxShadow:"dark-lg",transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}}>
			<Person2Icon style={{fontSize:'80px',textAlign:'center'}}/>
			<Flex direction='column'>
				<Text fontWeight='bold'>Name: {salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
				<Text >Email: {salesperson_data?.email_of_salesperson}</Text>
				<Text>Mobile: {salesperson_data?.mobile_of_salesperson}</Text>
			</Flex>
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
				<Flex direction='column' gap='2'>
					<Text>Joined date</Text>
					<Input type='date' placeholder='expiry date' variant='filled'  color='#000'/>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff'>Filter Results</Button>
			</Flex>
	)
}