//modules
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//api
import Get_Distributors from '../pages/api/distributors/get_distributors.js';
import Get_Industries from '../pages/api/controls/get_industries';
import Get_Technologies from '../pages/api/controls/get_technologies'
//icons
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
//components
import Header from '../components/Header.js'

export default function Distributors(){
	const router = useRouter();
	
	const [distributors_data, set_distributors_data]=useState([]);
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	const [filter_active, set_filter_active] = useState(false);
	const [suspension_status,set_suspension_status] = useState('false');
	const [subscription_status,set_subscription_status] = useState('true');
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

	const Clear_Filter_Options=()=>{
		set_sort('desc');
		set_search_query('');
		set_suspension_status('false')
		set_subscription_status('true')
	}

	const handle_get_distributors=async()=>{
		await Get_Distributors().then((response)=>{
			//console.log(response.data)
			const data = response.data
			if (sort === 'desc'){
				const sorted_result = data.filter(v => v.verification_status).sort((a, b) => a.company_name.localeCompare(b.company_name))
				//console.log(sorted_result)
				if (suspension_status === 'true'){
					const result = sorted_result?.filter((item) => item.suspension_status)
					set_distributors_data(result)
				}else if(suspension_status === 'false'){
					const result = sorted_result?.filter((item) => !item?.suspension_status)
					set_distributors_data(result)
				}else{
					set_distributors_data(sorted_result)
				}
			}else{
				const sorted_result = data.filter(v => v.verification_status).sort((a, b) => b.company_name.localeCompare(a.company_name))
				//console.log(sorted_result)
				if (suspension_status === 'true'){
					const result = sorted_result?.filter((item) => item.suspension_status)
					set_distributors_data(result)
				}else if(suspension_status === 'false'){
					const result = sorted_result?.filter((item) => !item?.suspension_status)
					set_distributors_data(result)
				}else{
					set_distributors_data(sorted_result)
				}
			}
		}).catch((err)=>{
			//console.log(err)
			set_distributors_data([])
		})
	}
	//functions
	//useEffect
	useEffect(()=>{
		handle_get_distributors()
	},[suspension_status,subscription_status,search_query,sort])

	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Distributors({distributors_data?.length})</Text>
			{filter_active? 
				<FilterBar set_filter_active={set_filter_active} set_suspension_status={set_suspension_status} set_subscription_status={set_subscription_status}/>
				: null
			}
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
					<option value='desc'>A - Z</option>
					<option value='asc'>Z - A</option>
				</Select>
				{search_query !== '' || suspension_status !== 'false' || subscription_status !== 'true' || sort !== 'desc'? 
					<Text color='grey' onClick={Clear_Filter_Options} ml='3' cursor='pointer'>Clear Filter</Text> : 
					null
				}
			</Flex>
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
				{subscription_status === 'false'? 
					<Flex align='center'bg='#eee' p='1' boxShadow='md' cursor='pointer' onClick={(()=>{set_subscription_status('true')})}>
						<Text >Not subscribed</Text>
						<CloseIcon style={{fontSize:'14px',paddingTop:'3px'}}/>
					</Flex>
					: 
					null
				}
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search Distributors' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			{distributors_data.length == 0?
				<Flex h='40vh' justify='center' align='center'>
					<Text fontSize='28px' fontWeight='bold' color='grey'>No Users match your search query</Text>
				</Flex>
			:
				<Flex p='2' gap='2' direction='column' h='80vh' overflowY='scroll'>
					{distributors_data?.filter((item) => item?.email_of_company?.toLowerCase().includes(search_query.toLowerCase()) ||
																item?.company_name?.toLowerCase().includes(search_query.toLowerCase()) || 
																item?.first_name?.toLowerCase().includes(search_query.toLowerCase()) ||
																item?.industry?.toLowerCase().includes(industry.toLowerCase()) ||
																item?.technology?.toLowerCase().includes(technology.toLowerCase()) ||
																item?.mobile_of_company?.includes(search_query) ||
																item?.last_name?.toLowerCase().includes(search_query.toLowerCase())).map((distributor_data)=>{
						return(
							<div key={distributor_data?._id} >
								<Distributor distributor_data={distributor_data}/>
							</div>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Distributor=({distributor_data})=>{
	const router = useRouter()
	return(
		<Flex 
			boxShadow='lg' 
			gap='1' 
			bg='#fff' 
			borderRadius='5'
			>
			<Image 
				boxSize='150px' 
				src={distributor_data?.profile_photo_url == '' || !distributor_data?.profile_photo_url ? './Pro.png' : distributor_data?.profile_photo_url} 
				bg='grey' alt='photo' 
				objectFit='cover' 
				border='1px solid #eee' 
				borderRadius='5'/>
			<Flex p='2' direction='column' flex='1' gap='2' justify='space-between' position='relative'>
				<Flex direction='column' gap='2'>
					{distributor_data?.suspension_status? <Text position='absolute' top='5' right='2' fontSize='14px' fontWeight='bold' color='red'>suspended</Text>:null}
					{distributor_data?.subscription? <Text position='absolute' top='10' right='2' fontSize='14px' fontWeight='bold' color='#009393'>subscribed</Text>:null}
					<Text fontWeight='bold' fontSize='20px'>{distributor_data?.company_name}</Text>
					<Text fontSize='14px'>{distributor_data?.mobile_of_company}</Text>
					<Text fontSize='14px'>{distributor_data?.email_of_company}</Text>					
				</Flex>
				<Button onClick={(()=>{router.push(`/distributor/${distributor_data?._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_suspension_status})=>{
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