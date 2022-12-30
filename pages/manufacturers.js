import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterManufacturerModal from '../components/modals/filterManufacturers.js';
import Get_Manufacturers from '../pages/api/manufacturers/get_manufacturers.js';

function Manufacturers(){
	const router = useRouter();
	const [isfiltermanufacturerModalvisible,setisfiltermanufacturerModalvisible]=useState(false);
	const [manufacturers_data, set_manufacturers_data]=useState([]);
	const [filter_active, set_filter_active] = useState(false);
	const [suspenstion_status,set_suspenstion_status] = useState('')
	const [subscription_status,set_subscription_status] = useState('')
	const [search_query,set_search_query] = useState('');
	const [industry,set_industry] = useState('');


	console.log(suspenstion_status)
	useEffect(()=>{
		console.log(suspenstion_status)
		Get_Manufacturers().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result_data = data?.filter((item) => item?.email_of_company.toLowerCase().includes(search_query) || item?.company_name.toLowerCase().includes(search_query) || item?.first_name.toLowerCase().includes(search_query) || item?.last_name.toLowerCase().includes(search_query)).sort((a, b) => a.first_name.localeCompare(b.first_name))
			if(suspenstion_status === 'true'){
				const result = result_data?.filter((item) => !item.suspension_status)
				console.log(result)
				set_manufacturers_data(result);
			}else{
				// const result = result_data?.filter((item) => item.suspension_status)
				// console.log(result)
				set_manufacturers_data(result_data);
			}
			if(subscription_status === 'false'){
				const result = result_data?.filter((item) => !item.subscription)
				console.log(result)
				set_manufacturers_data(result);
			}else{
				// const result = result_data?.filter((item) => item.suspension_status)
				// console.log(result)
				set_manufacturers_data(result_data);
			}
			
		})
	},[suspenstion_status,subscription_status,search_query])

	return(
		<Flex direction='column'>
			<FilterManufacturerModal isfiltermanufacturerModalvisible={isfiltermanufacturerModalvisible} setisfiltermanufacturerModalvisible={setisfiltermanufacturerModalvisible}/>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px'>Manufacturers</Text>
			{filter_active? 
				<FilterBar set_filter_active={set_filter_active} set_suspenstion_status={set_suspenstion_status} set_subscription_status={set_subscription_status} set_industry={set_industry}/>
				: null
			}
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search Manufacturers' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex p='2' gap='2'>
				{manufacturers_data?.map((manufacturer_data)=>{
					return(
						<div key={manufacturer_data._id} >
							<Manufacturer manufacturer_data={manufacturer_data}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Manufacturers;

const Manufacturer=({manufacturer_data})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='225px' boxShadow='dark-lg' h='200px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='70px' src='./Pro.png' bg='grey' alt='photo' objectFit='cover' border='1px solid #eee'/>
			<Flex p='2' direction='column' flex='1' justify='space-between'>
				<Text fontWeight='bold'>{manufacturer_data.company_name}</Text>
				<Text fontSize='14px'>{manufacturer_data.mobile_of_company}</Text>
				<Text fontSize='14px'>{manufacturer_data.email_of_company}</Text>
				<Button onClick={(()=>{router.push(`/manufacturer/${manufacturer_data._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_subscription_status,set_suspenstion_status,set_industry})=>{
	return(
			<Flex color='#fff' direction='column' gap='3' p='4' w='50vw' h='90vh' bg='#090F14' position='absolute' top='75px' left='0px' zIndex='2' boxShadow='dark-lg'>
				<Flex justify='space-between' p='2'>
					<Text>Filter results</Text>
					<Text cursor='pointer' onClick={(()=>{set_filter_active(false)})}>Close</Text>
				</Flex>
				<Flex direction='column' >
					<Text>Suspension status</Text>
					<Select placeholder='Suspension status' bg='#fff' color='#000' onChange={((e)=>{set_suspenstion_status(e.target.value)})}>
						<option value={'false'} >Suspended</option>
						<option value={'true'} >Active</option>
						<option value={''} >All</option>
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Subscription status</Text>
					<Select placeholder='Subscription status' bg='#fff' color='#000' onChange={((e)=>{set_subscription_status(e.target.value)})}>
						<option value={'true'} >Subscribed</option>
						<option value={'false'} >Not Subscribed</option>
						<option value={''} >All</option>
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Industry</Text>
					<Select placeholder='Industry' bg='#fff' color='#000' onChange={((e)=>{set_industry(e.target.value)})}>
						<option value={'agriculture'} >agriculture</option>
						<option value={'pharmacy'} >pharmacy</option>
						<option value={''} >All</option>
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Technology</Text>
					<Select placeholder='Technology' bg='#fff' color='#000' onChange={((e)=>{})}>
						<option value={'false'} >agriculture</option>
						<option value={'true'} >pharmacy</option>
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