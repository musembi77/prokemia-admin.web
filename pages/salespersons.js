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
import CloseIcon from '@mui/icons-material/Close';
//api-calls imports
import Get_SalesPeople from '../pages/api/salespeople/get_salespeople.js';
import { RWebShare } from "react-web-share";

function SalesPersons(){
	const router = useRouter();

	const [salespeople_data, set_salespeople_data]=useState([]);
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	const [filter_active, set_filter_active] = useState(false);
	const [suspension_status,set_suspension_status] = useState('false');
	const [search_query,set_search_query] = useState('');

	const [sort,set_sort]=useState('desc');

	const handle_get_salespeople=async()=>{
		await Get_SalesPeople().then((response)=>{
			////console.log(response.data)
			const data = response.data
			if (sort === 'desc'){
				const sorted_result = data.sort((a, b) => a.first_name.localeCompare(b.first_name))
				//console.log(sorted_result)
				if (suspension_status === 'true'){
					const result = sorted_result?.filter((item) => item.suspension_status)
					set_salespeople_data(result)
				}else if(suspension_status === 'false'){
					const result = sorted_result?.filter((item) => !item?.suspension_status)
					set_salespeople_data(result)
				}else{
					set_salespeople_data(sorted_result)
				}
			}else{
				const sorted_result = data.sort((a, b) => b.first_name.localeCompare(a.first_name))
				////console.log(sorted_result)
				if (suspension_status === 'true'){
					const result = sorted_result?.filter((item) => item.suspension_status)
					set_salespeople_data(result)
				}else if(suspension_status === 'false'){
					const result = sorted_result?.filter((item) => !item?.suspension_status)
					set_salespeople_data(result)
				}else{
					set_salespeople_data(sorted_result)
				}
			}
		}).catch((err)=>{
			//console.log(err)
			set_salespeople_data([])
		})
	}
	//functions
	//useEffect
	useEffect(()=>{
		handle_get_salespeople()
	},[suspension_status,search_query,sort])
	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Salespersons</Text>
			{filter_active? 
				<FilterBar set_filter_active={set_filter_active} set_suspension_status={set_suspension_status}/>
				: null
			}
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
					<option value='desc'>A - Z</option>
					<option value='asc'>Z - A</option>
				</Select>
			</Flex>
			<RWebShare
				data={{
					text: "Account Sign Up Link.",
					url: "https://prokemia.com/signup/sales",
					title: "Signup Link",
				}}>
				<Button w='150px' bg='#009393' ml='2' color='#fff'>signup link 🔗</Button>
			</RWebShare>
			<Flex p='2' m='0' gap='2'>
				{suspension_status === 'true'? 
					<Flex align='center'bg='#eee' p='1' boxShadow='md' cursor='pointer' onClick={(()=>{set_suspension_status('false')})}>
						<Text align='center' >suspended</Text>
						<CloseIcon style={{fontSize:'16px',paddingTop:'3px'}}/>
					</Flex>
					: 
					null
				}
				{sort !== 'desc'? 
					<Flex align='center'bg='#eee' p='1' boxShadow='md' cursor='pointer' onClick={(()=>{set_sort('desc')})}>
						<Text align='center' >ascending</Text>
						<CloseIcon style={{fontSize:'16px',paddingTop:'3px'}}/>
					</Flex>
					: 
					null
				}
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search salespeople' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex gap='2' w='' direction='column' bg='#eee' borderRadius='5' m='2' p='2' h=''>
				{salespeople_data?.filter((item) => item?.email_of_salesperson.toLowerCase().includes(search_query.toLowerCase()) ||
													item?.company_name.toLowerCase().includes(search_query.toLowerCase()) ||
													item?.first_name.toLowerCase().includes(search_query.toLowerCase()) ||
													item?.last_name.toLowerCase().includes(search_query.toLowerCase())).map((salesperson_data)=>{
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
		<Flex boxShadow='lg' gap='1' bg='#fff' borderRadius='5'>
			{salesperson_data?.profile_photo_url == '' || !salesperson_data?.profile_photo_url ? 
				<Person2Icon style={{fontSize:'150px',textAlign:'center'}}/> 
			:
				<Image boxSize='150px' src={salesperson_data?.profile_photo_url} bg='grey' alt='photo' objectFit='cover' border='1px solid #eee' borderRadius='5'/>
			}
			<Flex p='2' direction='column' flex='1' gap='2' justify='space-between' position='relative'>
				<Flex direction='column' gap='2'>
				{salesperson_data?.suspension_status? <Text position='absolute' top='5' right='2' fontSize='14px' fontWeight='bold' color='red'>suspended</Text>:null}
					<Text fontWeight='bold' fontSize='20px'>{salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
					<Text fontSize='14px'>{salesperson_data?.email_of_salesperson}</Text>
					<Text fontSize='14px'>{salesperson_data?.mobile_of_salesperson}</Text>					
				</Flex>
				<Button onClick={(()=>{router.push(`/salesperson/${salesperson_data?._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_date,set_suspension_status,set_region})=>{
	return(
			<Flex color='#fff' direction='column' gap='3' p='4' w='50vw' h='90vh' bg='#090F14' position='absolute' top='75px' left='0px' zIndex='2' boxShadow='dark-lg'>
				<Flex justify='space-between' p='2'>
					<Text>Filter results</Text>
					<Text cursor='pointer' onClick={(()=>{set_filter_active(false)})}>Close</Text>
				</Flex>
				<Flex direction='column' >
					<Text>Suspension status</Text>
					<Select placeholder='Suspension status' bg='#fff' color='#000' onChange={((e)=>{set_suspension_status(e.target.value);set_filter_active(false)})}>
						<option value={'true'} >Suspended</option>
						<option value={'false'} >Active</option>
					</Select>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_filter_active(false)})}>Filter Results</Button>
			</Flex>
	)
}