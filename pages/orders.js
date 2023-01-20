import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import Product from '../components/Product.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductModal from '../components/modals/filterProduct.js';
import OrderItemModal from '../components/modals/OrderItemModal.js';
import {useRouter} from 'next/router';
import Get_Orders from './api/orders/get_orders.js';

function Orders(){
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	const [isvieworderModalvisible,setisvieworderModalvisible]=useState(false);
	
	const [orders_data,set_orders]=useState([]);
	const [sort_value,set_sort_value]=useState('')
	const [search_query,set_search_query] = useState('');

	useEffect(()=>{
		console.log(search_query)
		Get_Orders().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result_data = data?.filter((item) => 	item?.order_status.includes(search_query.toLowerCase()) ||
														item?.name_of_client.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.name_of_product.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.email_of_creator.toLowerCase().includes(search_query.toLowerCase()) || 
														item?._id.includes(search_query.toLowerCase()))
			console.log(result_data)
			set_orders(result_data)
		})
	},[search_query,sort_value])

	return(
		<Flex direction='column'>
			<FilterProductModal isfilterproductModalvisible={isfilterproductModalvisible} setisfilterproductModalvisible={setisfilterproductModalvisible}/>
			<OrderItemModal isvieworderModalvisible={isvieworderModalvisible} setisvieworderModalvisible={setisvieworderModalvisible}/>
			<Header/>
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Orders</Text>
			<Flex gap='2' p='2' align='center'>
				<Select w='150px' placeholder='sort' onChange={((e)=>{set_search_query(e.target.value)})}>
					<option value=''>All </option>
					<option value='pending'>Pending </option>
					<option value='disbursed'>Disbursed</option>
					<option value='completed'>Completed</option>
					<option value='rejected'>Rejected</option>
				</Select>
				<Flex gap='2' p='2' flex='1'>
					<Input placeholder='search Orders' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
			</Flex>
			<Flex wrap='flex' direction='column' p='2' gap='2' mb='2' overflowY='scroll' h='80vh'>
				{orders_data.map((order)=>{
					return(
						<OrderItem key={order?._id} setisvieworderModalvisible={setisvieworderModalvisible} order={order}/>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Orders;

const OrderItem=({setisvieworderModalvisible,order})=>{
	const router = useRouter();
	return(
		<Flex _hover={{transform:"scale(1.01)",transition:'ease-out 1s all',bg:'#009393',color:'#fff'}} boxShadow='lg' p='2' bg='#fff' onClick={(()=>{router.push(`/order/${order?._id}`)})} cursor='pointer' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
			<Text fontSize='20px' fontWeight='bold'>Order Id: {order?._id}</Text>
			<Text>Product Name: {order?.name_of_product}</Text>
			<Text>Unit Price: {order?.unit_price}</Text>
			<Text>Volume: {order?.volume_of_items}</Text>
			<Text>Total: {order?.total}</Text>	
			<Text>Email of Client: {order?.email_of_client}</Text>	
			<Text>date: {order?.createdAt}</Text>	
			<Flex gap='1'>
				<Text>Order Status:</Text>
				<Text color={order?.order_status === 'completed'? 'green' : 'orange'}>{order?.order_status}</Text>
			</Flex>
		</Flex>
	)
}
