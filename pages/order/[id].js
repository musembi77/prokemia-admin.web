import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image,Input} from '@chakra-ui/react';
import Header from '../../components/Header.js'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useRouter} from 'next/router';
import Get_Order from '../api/orders/get_order.js';
import Edit_Order from '../api/orders/edit_order.js';
import Create_Invoice from '../api/orders/create_invoice.js';

function Order(){
	const router = useRouter();
	const id = router.query;

	const payload = {
		_id : id.id
	}
	const [order_data,set_order_data]=useState('')
	const [edit,set_edit]=useState(false)

	const get_Data=async(payload)=>{
		await Get_Order(payload).then((response)=>{
			set_order_data(response.data)
			console.log(response.data)
		})
	}
	useEffect(()=>{
		if (!payload || payload._id === undefined){
			alert("missing info could not fetch data")
			router.back()
		}else{
			console.log(payload)
			get_Data(payload)
		}
	},[])

	const handle_create_invoice=()=>{
		const payload = {
			_id: order_data._id,
			name_of_product: order_data.name_of_product,
			unit_price : order_data.unit_price,
			volume_of_items : order_data.volume_of_items,
			email_of_client : order_data.email_of_client,
			name_of_client : order_data.name_of_client,
			total: order_data.volume_of_items * order_data.unit_price
		}
		Create_Invoice(payload)
	}
	return(
		<Flex direction='column' gap='2'>
			<Header />
			{edit?
				<Edit_Order_Item order_data={order_data} set_edit={set_edit}/>
			:
				<Flex p='1' direction='column' gap='2'>
					<Flex boxShadow='lg' p='2' bg='#fff' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
						<Text fontSize='20px' fontWeight='bold'>Order Id: {order_data._id}</Text>
						<Text>Product Name: {order_data.name_of_product}</Text>
						<Text>Unit Price: {order_data.unit_price}</Text>
						<Text>Volume: {order_data.volume_of_items}</Text>
						<Text>Total: {order_data.total}</Text>
						<Text>Email of Client: {order_data.email_of_client}</Text>
						<Text>Name of Client: {order_data.name_of_client}</Text>
						<Text>date: {order_data.createdAt}</Text>
						<Flex gap='1'>
							<Text>Order Status:</Text>
							<Text color={order_data.order_status === 'completed'? 'green' : 'orange'}>{order_data.order_status}</Text>
						</Flex>
					</Flex>
					{order_data.order_status === 'completed'?
						<Button mt='2' bg='#eee'>Order has been Completed</Button>
					:
						<Flex direction='column' gap='2'>
							<Flex justify='center' gap='2'>
								<Button bg='#009393' color='#fff' flex='1' onClick={handle_create_invoice}>Create Invoice</Button>
								<Button bg='#000' color='#fff' flex='1' onClick={(()=>{set_edit(true)})}>Edit Order</Button>
							</Flex>
							<Button bg='#fff' color='red' border='1px solid red'>Reject Order</Button>	
						</Flex>
					}
				</Flex>
			}
		</Flex>
	)
}

export default Order;

const Edit_Order_Item=({order_data,set_edit})=>{
	const [name_of_product,set_name_of_product]=useState(order_data?.name_of_product)
	const [unit_price,set_unit_price]=useState(order_data?.unit_price)
	const [volume_of_items,set_volume_of_items]=useState(order_data?.volume_of_items)
	const [email_of_client,set_email_of_client]=useState(order_data?.email_of_client)
	const [name_of_client,set_name_of_client]=useState(order_data?.name_of_client)

	const payload = {
		_id: order_data._id,
		name_of_product,
		unit_price,
		volume_of_items,
		email_of_client,
		name_of_client,
		total: volume_of_items * unit_price
	}

	const handle_edit=async()=>{
		console.log(payload)
		await Edit_Order(payload).then(()=>{
			alert('success')
			set_edit(false)
		})		
	}
	return(
		<Flex boxShadow='lg' p='2' bg='#fff' gap='2' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393' m='2'>
			<Flex direction='column'>
				<Text>Product Name:</Text>
				<Input variant='filled' placeholder={order_data.name_of_product} onChange={((e)=>{set_name_of_product(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
				<Text>Unit Price:</Text>
				<Input variant='filled' placeholder={order_data.unit_price} onChange={((e)=>{set_unit_price(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
				<Text>Volume of Items:</Text>
				<Input variant='filled' placeholder={order_data.volume_of_items} onChange={((e)=>{set_volume_of_items(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
				<Text>Email of Client:</Text>
				<Input variant='filled' placeholder={order_data.email_of_client} onChange={((e)=>{set_email_of_client(e.target.value)})}/>
			</Flex>
			<Flex direction='column'>
				<Text>Name of Client:</Text>
				<Input variant='filled' placeholder={order_data.name_of_client} onChange={((e)=>{set_name_of_client(e.target.value)})}/>
			</Flex>
			<Button onClick={handle_edit} bg='#009393' mt='2' color='#fff'>Save</Button>
		</Flex>
	)
}