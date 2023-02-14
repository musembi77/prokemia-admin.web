import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
// import Get_Products from '../../api/Products/get_products.js'
import Get_Manufacturers from '../../api/manufacturers/get_manufacturers.js';

export default function Manufacturers(){
	const router = useRouter();
	
	const [manufacturers_data, set_manufacturers_data]=useState([]);

	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			//console.log(data.filter(v => !v.verification_status))
			set_manufacturers_data(result)
		})
	}
	
	useEffect(()=>{
		get_Manufacturers_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Manufacturers</Text>
			{manufacturers_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
					<Text>You dont have new manufacturers to verify.</Text>
				</Flex>
			:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{manufacturers_data?.map((item)=>{
						return(
							<Manufacturer_Item item={item} key={item._id}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Manufacturer_Item=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#eee' borderRadius='5' boxShadow='lg' h='175px' p='1' justify='space-between'>
			<Flex p='2' direction='column'>
				<Text fontWeight='bold' fontSize='20px'>{item?.company_name}</Text>
				<Text>{item?.email_of_company}</Text>
				<Text>{item?.address_of_company}</Text>
			</Flex>
			<Button onClick={(()=>{router.push(`/notifications/manufacturer/${item?._id}`)})} bg='#000' color='#fff'>View</Button>
		</Flex>
	)
}