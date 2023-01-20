//modules
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
//utils
import {useRouter} from 'next/router';
//icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';

//api
import Get_Manufacturers from '../pages/api/manufacturers/get_manufacturers.js';
import Get_Industries from '../pages/api/controls/get_industries';
import Get_Technologies from '../pages/api/controls/get_technologies'
//components
import Header from '../components/Header.js';

export default function Manufacturers(){
	//utils
	const router = useRouter();
	//states

	const [manufacturers_data, set_manufacturers_data]=useState([]);
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	const [filter_active, set_filter_active] = useState(false);
	const [suspenstion_status,set_suspenstion_status] = useState('true');
	const [subscription_status,set_subscription_status] = useState('');
	const [search_query,set_search_query] = useState('');
	const [industry,set_industry] = useState('');
	const [technology,set_technology] = useState('');

	const [sort,set_sort]=useState('desc');
	//api
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		}).catch((err)=>{
			set_industry([])
		})
	}

	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		}).catch((err)=>{
			set_technology([])
		})
	}

	const handle_get_manufacturers=async()=>{
		await Get_Manufacturers().then((response)=>{
			//console.log(response.data)
			const data = response.data
			if (sort === 'desc'){
				const sorted_result = data.sort((a, b) => a.company_name.localeCompare(b.company_name))
				//console.log(sorted_result)
				if (suspenstion_status === 'true'){
					const result = sorted_result?.filter((item) => !item.suspension_status)
					set_manufacturers_data(result)
				}else if(suspenstion_status === 'false'){
					const result = sorted_result?.filter((item) => item?.suspension_status)
					set_manufacturers_data(result)
				}else{
					set_manufacturers_data(sorted_result)
				}
			}else{
				const sorted_result = data.sort((a, b) => b.company_name.localeCompare(a.company_name))
				//console.log(sorted_result)
				if (suspenstion_status === 'true'){
					const result = sorted_result?.filter((item) => !item.suspension_status)
					set_manufacturers_data(result)
				}else if(suspenstion_status === 'false'){
					const result = sorted_result?.filter((item) => item?.suspension_status)
					set_manufacturers_data(result)
				}else{
					set_manufacturers_data(sorted_result)
				}
			}
		}).catch((err)=>{
			set_manufacturers_data([])
		})
	}
	//functions
	//useEffect
	useEffect(()=>{
		get_Industries_Data()
		get_Technology_Data()
		handle_get_manufacturers()
	},[suspenstion_status,subscription_status,search_query,sort])

	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px'>Manufacturers</Text>
			{filter_active? 
				<FilterBar industries_data={industries_data} technologies_data={technologies_data} set_filter_active={set_filter_active} set_suspenstion_status={set_suspenstion_status} set_subscription_status={set_subscription_status} set_industry={set_industry} set_technology={set_technology}/>
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
				<Input placeholder='search Manufacturers' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			{manufacturers_data.length == 0?
				<Flex h='40vh' justify='center' align='center'>
					<Text fontSize='28px' fontWeight='bold' color='grey'>No Users match your search query</Text>
				</Flex>
			:
				<Flex p='2' gap='2' direction='column'>
					{manufacturers_data?.filter((item) => item?.email_of_company?.toLowerCase().includes(search_query.toLowerCase()) ||
																item?.company_name?.toLowerCase().includes(search_query.toLowerCase()) || 
																item?.first_name?.toLowerCase().includes(search_query.toLowerCase()) ||
																item?.industry?.toLowerCase().includes(industry.toLowerCase()) ||
																item?.technology?.toLowerCase().includes(technology.toLowerCase()) ||
																item?.mobile_of_company?.includes(search_query) ||
																item?.last_name?.toLowerCase().includes(search_query.toLowerCase())).map((manufacturer_data)=>{
						return(
							<div key={manufacturer_data?._id} >
								<Manufacturer manufacturer_data={manufacturer_data}/>
							</div>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Manufacturer=({manufacturer_data})=>{
	const router = useRouter()
	return(
		<Flex boxShadow='lg' gap='1' bg='#fff' borderRadius='5'>
			<Image boxSize='150px' src={manufacturer_data?.profile_photo_url == '' || !manufacturer_data?.profile_photo_url ? './Pro.png' : manufacturer_data?.profile_photo_url} bg='grey' alt='photo' objectFit='cover' border='1px solid #eee' borderRadius='5'/>
			<Flex p='2' direction='column' flex='1' gap='2'>
				<Text fontWeight='bold' fontSize='20px'>{manufacturer_data?.company_name}</Text>
				<Text fontSize='14px'>{manufacturer_data?.mobile_of_company}</Text>
				<Text fontSize='14px'>{manufacturer_data?.email_of_company}</Text>
				<Button onClick={(()=>{router.push(`/manufacturer/${manufacturer_data?._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_subscription_status,set_suspenstion_status,set_technology,set_industry,industries_data,technologies_data})=>{
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
					<Text>Industry</Text>
					<Select placeholder='Industry' bg='#fff' color='#000' onChange={((e)=>{set_industry(e.target.value)})}>
						{industries_data?.map((item)=>{
								return(
									<option key={item._id} value={item.title}>{item.title}</option>

								)
							})}
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Technology</Text>
					<Select placeholder='Technology' bg='#fff' color='#000' onChange={((e)=>{set_technology(e.target.value)})}>
						{technologies_data?.map((item)=>{
							return(
								<option key={item._id} value={item.title}>{item.title}</option>
							)
						})}
					</Select>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_filter_active(false)})}>Filter Results</Button>
			</Flex>
	)
}