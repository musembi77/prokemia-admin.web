import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
// import Get_Products from '../../api/Products/get_products.js'
import Get_Distributors from '../../api/distributors/get_distributors.js';

export default function Distributors(){
	const router = useRouter();
	
	const [distributors_data, set_distributors_data]=useState([]);

	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_distributors_data(result)
		})
	}
	
	useEffect(()=>{
		get_Distributors_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Distributors</Text>
			{distributors_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
					<Text>You dont have new distributors to verify.</Text>
				</Flex>
			:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{distributors_data?.map((item)=>{
						return(
							<Distributor_Item item={item} key={item._id}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Distributor_Item=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#eee' borderRadius='5' boxShadow='lg' h='175px' p='1' justify='space-between'>
			<Flex p='2' direction='column'>
				<Text fontWeight='bold' fontSize='20px'>{item?.company_name}</Text>
				<Text>{item?.email_of_company}</Text>
				<Text>{item?.address_of_company}</Text>
			</Flex>
			<Button onClick={(()=>{router.push(`/notifications/distributor/${item?._id}`)})} bg='#000' color='#fff'>View</Button>
		</Flex>
	)
}