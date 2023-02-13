import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
// import Get_Products from '../../api/Products/get_products.js'
import Get_Orders from '../api/orders/get_orders.js';

export default function Sales_Inventory(){
	const router = useRouter();
	
	const [orders_data,set_orders]=useState([]);

	const get_Orders_Data=async()=>{
		await Get_Orders().then((response)=>{
			let data = response.data
			console.log(data)
			const result = data.filter((item)=> !item.order_notification_status)
			set_orders(result)
		})
	}
	
	useEffect(()=>{
		get_Orders_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Sales</Text>
			{orders_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
					<Text>You dont have any orders to view.</Text>
				</Flex>
			:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{orders_data?.map((item)=>{
						return(
							<Orders item={item} key={item._id}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Orders=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' m='1' w='100%' bg='#eee' borderRadius='5' p='2' boxShadow='lg' h='200px'>
			<Text fontWeight='bold' fontSize='24px'>{item?.name_of_client}</Text>
			<Text>Unit Price: {item?.unit_price} </Text>
			<Text>Volume: {item?.volume_of_items} </Text>
			<Text>Total: {item?.total} </Text>
			<Text>Date: {item?.createdAt}</Text>
			<Button bg='#000' color='#fff' onClick={(()=>{router.push(`/order/${item?._id}`)})}>View Order</Button>
		</Flex>
	)
}