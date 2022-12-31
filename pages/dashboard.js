import React,{useState,useEffect}from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import Header from '../components/Header.js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddNewProduct from '../components/modals/addNewProduct.js';
import AddNewManufacturer from '../components/modals/addNewManufacturer.js';
import {useRouter} from 'next/router';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import Get_Clients from './api/clients/get_clients.js';
import Get_Distributors from '../pages/api/distributors/get_distributors.js';
import Get_Manufacturers from '../pages/api/manufacturers/get_manufacturers.js';
import Get_SalesPeople from '../pages/api/salespeople/get_salespeople.js';
import Get_Orders from './api/orders/get_orders.js';
import Get_Products from './api/Products/get_products.js'

function Dashboard(){
	const [isaddnewproductModalvisible,setisaddnewProductModalvisible]=useState(false);
	const [isaddnewmanufacturerModalvisible,setisaddnewmanufacturerModalvisible]=useState(false);
	const [clients_data, set_clients_data] = useState([]);
	const [distributors_data, set_distributors_data]=useState([]);
	const [manufacturers_data, set_manufacturers_data]=useState([]);
	const [salespeople_data, set_salespeople_data]=useState([]);
	const [orders_data,set_orders]=useState([]);
	const [products,set_products]=useState([]);

	const [distributors_notification_data, set_distributors_notification_data]=useState(0);
	const [manufacturers_notification_data, set_manufacturers_notification_data]=useState(0);
	const [salespeople_notification_data, set_salespeople_notification_data]=useState(0);
	const [orders_notification_data,set_orders_notification_data]=useState(0);
	const [products_notification_data,set_products_notification_data]=useState(0);
	const [notification_count,set_notification_count]=useState(0);

	const [user_name,set_user_name] = useState("admin")
	const router = useRouter();
	const cookies = new Cookies();
  	let token = cookies.get('admin_token');

  	useEffect(()=>{
	    if(token){
	      let decoded = jwt_decode(token);
	      ////console.log(decoded);
	      set_user_name(decoded.user_name)
		    Get_Clients().then((response)=>{
		  		const data = response?.data
		  		set_clients_data(data)
			})
			Get_Distributors().then((response)=>{
		  		const data = response?.data
		  		set_distributors_data(data)
		  		//console.log(data)
		  		const notification_result = data.filter(item => !item.verification_status)
		  		//console.log(notification_result)
		  		set_distributors_notification_data(notification_result?.length)
			})
			Get_Manufacturers().then((response)=>{
		  		const data = response?.data
		  		set_manufacturers_data(data)
		  		const notification_result = data.filter(item => !item.verification_status)
		  		set_manufacturers_notification_data(notification_result?.length)
			})
			Get_SalesPeople().then((response)=>{
		  		const data = response?.data
		  		set_salespeople_data(data)
		  		//console.log(data)
		  		const notification_result = data.filter(item => !item.verification_status)
		  		set_salespeople_notification_data(notification_result?.length)
			})
			Get_Orders().then((response)=>{
		  		const data = response?.data
		  		set_orders(data)
		  		//console.log(data)
		  		// const notification_result = data.filter(item => !item.verification_status)
		  		// set_distributors_notification_data(notification_result?.length)
			})
			Get_Products().then((response)=>{
		  		const data = response?.data
		  		set_products(data)
		  		const notification_result = data.filter(item => !item.verification_status)
		  		set_products_notification_data(notification_result?.length)
			})
			
		}else{
			router.push('/')
		}
		set_notification_count(distributors_notification_data+manufacturers_notification_data+salespeople_notification_data+orders_notification_data+products_notification_data)
	  },[token])
	return(
		<Flex direction='column' bg='#eee'>
			<AddNewProduct isaddnewproductModalvisible={isaddnewproductModalvisible} setisaddnewProductModalvisible={setisaddnewProductModalvisible}/>
			<AddNewManufacturer isaddnewmanufacturerModalvisible={isaddnewmanufacturerModalvisible} setisaddnewmanufacturerModalvisible={setisaddnewmanufacturerModalvisible}/>
			<Header notification_count={notification_count}/>
			<Flex direction='column' position='relative'>
				<Text ml='2' fontWeight='bold' fontSize='42px' color='#000' textTransform={"capitalize"}>Welcome, <br/>{user_name}</Text>
				{notification_count !== 0?
					<FiberManualRecordIcon style={{fontSize:'25px',color:'#009393',position:'absolute',top:'5px',left:'5px'}}/>
					:null
				}
				<Text p='2'>You have {notification_count} new Notifications</Text>
			</Flex>
			<Flex w='100%' justify='center'>
				<Revenue_Tag orders_data={orders_data}/>
				<Flex w='30vw' justify='space-around' direction='column' mr='3'>
					<Flex w='100%' h='50%' gap='2' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' align='center' justify='center' >
						<Text color='#009393' fontSize='20px'>{products?.length}</Text>
						<Text>Products</Text>
					</Flex>
					<Flex w='100%' h='50%' gap='2' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' align='center' justify='center' >
						<Text color='#009393' fontSize='20px'>{orders_data?.length}</Text>
						<Text>Orders</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex>
				<Flex w='20vw' color='#fff' borderRadius='5' boxShadow='lg' p='1' m='1' align='center' justify='center' direction='column' gap='4' h='150px' bg='rgb(0, 147, 147,0.6)' textAlign='center'>
					<Text fontSize='32px' >{clients_data?.length}</Text>
					<Text fontWeight='bold'>clients</Text>
				</Flex>
				<Flex flex='1' direction='column' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' gap='1' justify='space-between'>
					{clients_data?.slice(0,2).map((item)=>{return(<Text key={item?._id} boxShadow='lg' onClick={(()=>{router.push(`/customer/${item._id}`)})} bg='#eee' p='2' borderRadius='5' cursor='pointer'>{item?.first_name} {item?.last_name}</Text>)})}
					<Text color='#009393' onClick={(()=>{router.push('/customers')})}>view all</Text>					
				</Flex>
			</Flex>
			<Flex>
				<Flex w='20vw' color='#000' borderRadius='5' boxShadow='lg' p='1' m='1' align='center' justify='center' direction='column' gap='4' h='150px' bg='#fff' textAlign='center'>
					<Text fontSize='32px' >{manufacturers_data?.length}</Text>
					<Text fontWeight='bold' w='100%'>Manufacturers</Text>
				</Flex>
				<Flex flex='1' direction='column' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' gap='1' justify='space-between'>
					{manufacturers_data?.slice(0,2).map((item)=>{return(<Text key={item?._id} boxShadow='lg' onClick={(()=>{router.push(`/manufacturer/${item._id}`)})} bg='#eee' p='2' borderRadius='5' cursor='pointer'>{item?.company_name} {item?.last_name}</Text>)})}
					<Text color='#009393' onClick={(()=>{router.push('/manufacturers')})}>view all</Text>						
				</Flex>
			</Flex>
			<Flex>
				<Flex w='20vw' color='#000' borderRadius='5' boxShadow='lg' p='1' m='1' align='center' justify='center' direction='column' gap='4' h='150px' bg='#fff' textAlign='center'>
					<Text fontSize='32px' >{salespeople_data?.length}</Text>
					<Text fontWeight='bold' w='100%'>Salespersons</Text>
				</Flex>
				<Flex flex='1' direction='column' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' gap='1' justify='space-between'>
					{salespeople_data?.slice(0,2).map((item)=>{return(<Text key={item?._id} boxShadow='lg' onClick={(()=>{router.push(`/salesperson/${item._id}`)})} bg='#eee' p='2' borderRadius='5' cursor='pointer'>{item?.first_name} {item?.last_name}</Text>)})}
					<Text color='#009393' onClick={(()=>{router.push('/salespersons')})}>view all</Text>						
				</Flex>
			</Flex>
			<Flex>
				<Flex w='20vw' color='#fff' borderRadius='5' boxShadow='lg' p='1' m='1' align='center' justify='center' direction='column' gap='4' h='150px' bg='rgb(101, 78, 163,0.5)' textAlign='center'>
					<Text fontSize='32px' >{distributors_data?.length}</Text>
					<Text fontWeight='bold' w='100%'>Distributors</Text>
				</Flex>
				<Flex flex='1' direction='column' bg='#fff' borderRadius='10' boxShadow='lg' m='2' p='2' gap='1' justify='space-between'>
					{distributors_data?.slice(0,2).map((item)=>{return(<Text key={item?._id} boxShadow='lg' onClick={(()=>{router.push(`/distributor/${item._id}`)})} bg='#eee' p='2' borderRadius='5' cursor='pointer'>{item?.first_name} {item?.last_name}</Text>)})}
					<Text color='#009393' onClick={(()=>{router.push('/distributors')})}>view all</Text>						
				</Flex>
			</Flex>
				<Flex m='2' flex='1' direction='column' borderBottom='1px solid #000' bg='#eee' borderRadius='5' p='2' gap='2'>
					<Flex justify='space-between' align='center'>
						<Text fontWeight='bold' fontSize='20px'>Notifications</Text>
						<Text cursor='pointer' color='#009393' onClick={(()=>{router.push('/notifications/')})}>view all</Text>
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Products</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Orders</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Distributors</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Salespersons</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Manufacturers</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Industry/Technology</Text>
						<NotificationsIcon />
					</Flex>
				</Flex>
				
		</Flex>
	)}

export default Dashboard;

const User_Tag=({user})=>{
	return(
		<Flex w='175px' color={user.color} borderRadius='5' boxShadow='lg' p='1' m='1' align='center' justify='center' direction='column' gap='4' h='150px' bg={user.bg}>
			<Text fontSize='42px' >{user?.numbers}</Text>
			<Text fontWeight='bold'>{user?.title}</Text>
		</Flex>
	)
}

const Revenue_Tag=({orders_data})=>{
//	//console.log(orders_data)090F14bg='rgb(0, 147, 147,0.6)'
	const completed_orders = orders_data?.filter((item)=>item.order_status.includes('completed'))
	const data = completed_orders.map((item)=> item.total)
	let total = Intl.NumberFormat().format(data.reduce((a, b) => a + b, 0));
	
	return(
		<Flex flex='1' margin='2' color={'#fff'} borderRadius='5' boxShadow='lg' p='2' direction='column' gap='' h='150px' bg={'#009393'} justify='space-between'>
			<Text fontSize='38px' fontWeight='bold'>KES {total}</Text>
			<Text fontWeight='bold'>sales-completed:  {completed_orders?.length}</Text>
		</Flex>
	)
}

const Notification=({notification_count})=>{
	return(
		<Flex position='absolute' top='10px' right='10px'>
			<Text>You have {notification_count} new Notifications</Text>
		</Flex>
	)
}