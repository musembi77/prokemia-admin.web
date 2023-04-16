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
	const [status,set_status] = useState('false')
	const [search_query,set_search_query] = useState('')
	const [region,set_region] = useState('')
	const [sort,set_sort]=useState('desc')

	const filter_obj = {
		suspension_status : status
	}
	//|| {status? item?.suspension_status() : !item?.suspension_status}
	//console.log(status)
	useEffect(()=>{
		//console.log(status)
		Get_Clients().then((response)=>{
			//console.log(response.data)
			const data = response.data
			if (sort == 'desc'){
				const sorted_result = data.sort((a, b) => a.first_name.localeCompare(b.first_name))
				const result_data = sorted_result?.filter((item) => item?.company_name.toLowerCase().includes(search_query.toLowerCase()) ||
																	item?.first_name.toLowerCase().includes(search_query.toLowerCase()))
				if(status === 'true'){
					const result = result_data?.filter((item) => item.suspension_status)
					//console.log(result)
					set_clients_data(result);
				}else{
					const result = result_data?.filter((item) => !item.suspension_status)
					//console.log(result)
					set_clients_data(result_data);
				}
			}else{
				const sorted_result = data.sort((a, b) => b.first_name.localeCompare(a.first_name))
				const result_data = sorted_result?.filter((item) => item?.company_name.toLowerCase().includes(search_query.toLowerCase()) ||
																	item?.first_name.toLowerCase().includes(search_query.toLowerCase()))
				if(status === 'true'){
					const result = result_data?.filter((item) => item.suspension_status)
					//console.log(result)
					set_clients_data(result);
				}else{
					const result = result_data?.filter((item) => !item.suspension_status)
					//console.log(result)
					set_clients_data(result_data);
				}
			}
		})
	},[status,search_query,sort])
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column'>
				<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Customers</Text>
				{filter_active? 
					<FilterBar set_filter_active={set_filter_active} set_status={set_status}/>
					: null
				}
				<Flex gap='2' p='2' align='center'>
					<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
					<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
						<option value='desc'>A - Z</option>
						<option value='asc'>Z - A</option>
					</Select>
				</Flex>
				<Flex gap='2' p='2'>
					<Input placeholder='search customers' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
				
				<Flex direction='column' gap='2' p='2'>
					{clients_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center'>
							<Text color='grey' fontSize='26px'>No customers meet the query search terms</Text>
						</Flex>
					:
						<Flex direction='column' gap='2' h='90vh' overflowY='scroll'>
							{clients_data?.map((client_data)=>{
								return(
									<div key={client_data?._id} >
										<Customer client_data={client_data}/>
									</div>
								)
							})}
						</Flex>
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Customers;


const Customer=({client_data})=>{
	const router = useRouter()
	return(
		<Flex boxShadow='lg' gap='1' bg='#fff' borderRadius='5'>
			<Image boxSize='150px' src={client_data?.profile_photo_url == '' || !client_data?.profile_photo_url ? './Pro.png' : client_data?.profile_photo_url} bg='grey' alt='photo' objectFit='cover' border='1px solid #eee' borderRadius='5'/>
			<Flex p='2' direction='column' flex='1' gap='2' justify='space-between'>
				<Flex direction='column' gap='2'>
					<Text fontWeight='bold' fontSize='20px'>{client_data?.first_name} {client_data?.last_name}</Text>
					<Text fontSize='14px'>Mobile: {client_data?.mobile_of_company}</Text>
					<Text fontSize='14px'>Email: {client_data?.email_of_company}</Text>					
				</Flex>
				<Button onClick={(()=>{router.push(`/customer/${client_data?._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}



const FilterBar=({set_filter_active,set_status})=>{
	return(
			<Flex color='#fff' direction='column' gap='3' p='4' w='50vw' h='90vh' bg='#090F14' position='absolute' top='75px' left='0px' zIndex='2' boxShadow='dark-lg'>
				<Flex justify='space-between' p='2'>
					<Text>Filter results</Text>
					<Text cursor='pointer' onClick={(()=>{set_filter_active(false)})}>Close</Text>
				</Flex>
				<Flex direction='column' >
					<Text>Suspension status</Text>
					<Select placeholder='Suspension status' bg='#fff' color='#000' onChange={((e)=>{set_status(e.target.value)})}>
						<option value={'false'} >Active</option>
						<option value={'true'} >Suspended</option>
						<option value={''} >All</option>
					</Select>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_filter_active(false)})}>Filter Results</Button>
			</Flex>
	)
}