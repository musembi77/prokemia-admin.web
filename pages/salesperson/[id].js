//modules imports
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image,Link,useToast,Select} from '@chakra-ui/react';
import {useRouter} from 'next/router';
//comsponents imports
import Header from '../../components/Header.js'
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
//icons imports
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DoneAllIcon from '@mui/icons-material/DoneAll';
//api calls
import Get_SalesPerson from '../api/salespeople/get_salesperson.js'
import Get_Orders from '../api/orders/get_orders.js';

function Salesperson(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const toast = useToast();
	const router = useRouter();
	const query = router.query
	const id = query.id

	const [salesperson_data,set_salesperson_data] = useState('');
	const [sort_value,set_sort_value]=useState('')
	const [orders_data,set_orders]=useState([]);
	const [total,set_total]=useState(0);		
	const [recents,set_recents]=useState(salesperson_data?.recents)

	const payload = {
		_id : id
	}
	const get_data=async(payload)=>{
		await Get_SalesPerson(payload).then((response)=>{
			//console.log(response)
			const email = response.data?.email_of_salesperson
			set_salesperson_data(response.data)
			fetch_orders(email)
		})
	}

	const fetch_orders=async(email)=>{
		await Get_Orders().then((response)=>{
			//console.log(response.data)
			const data = response.data
			//console.log(data)
			const result_data = data?.filter((item) => 	item?.email_of_creator.toLowerCase().includes(email?.toLowerCase()) && item?.order_status.includes(sort_value.toLowerCase()) )
			//console.log(result_data)
			set_orders(result_data)

			const completed_orders = result_data?.filter((item)=>item.order_status.includes('completed'))
			const completed_sales_data = completed_orders.map((item)=> item.total)
			let total_sales = Intl.NumberFormat().format(completed_sales_data.reduce((a, b) => a + b, 0));
			set_total(total_sales)
		})
	}

	useEffect(()=>{
		if (!payload || id === undefined){
			toast({
              title: '',
              description: `...broken link, redirecting you.`,
              status: 'info',
              isClosable: true,
            });
			router.push('/salespersons')
		}else{
			get_data(payload)
		}
	},[sort_value])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} salesperson_data={salesperson_data} acc_type={"salespersons"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} salesperson_data={salesperson_data} acc_type={"salespersons"} payload={payload}/>
			<Header />
			<Flex p='1' direction='column' gap='2'>
				<Flex justify='space-between' gap='4'>
					<Flex direction='column' align='center'>
						{salesperson_data?.profile_photo_url == '' || !salesperson_data?.profile_photo_url? 
							<Flex gap='2' >
								<AccountBoxIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
							</Flex>
						: 
							<Flex gap='2' >
								<Image borderRadius='5' boxSize='150px' src={salesperson_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
						<Text fontWeight='bold' fontSize='20px'>{salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
						{salesperson_data?.suspension_status? 
							<Text fontSize='16px' opacity='.6' border='1px solid red' w='100px' p='1' m='1'>Suspended</Text>
							: 
							null
						}
					</Flex>
					<Flex flex='1' direction='column' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
							<Text><span style={{fontWeight:"bold"}}>Email:</span> {salesperson_data?.email_of_salesperson}</Text>
							<Text><span style={{fontWeight:"bold"}}>Mobile:</span>  {salesperson_data?.mobile_of_salesperson}</Text>
							<Text><span style={{fontWeight:"bold"}}>Address:</span> {salesperson_data?.address}</Text>
							<Text><span style={{fontWeight:"bold"}}>Company:</span>  {salesperson_data?.company_name}</Text>
							<Text><span style={{fontWeight:"bold"}}>Joined in:</span> {salesperson_data?.joined_in}</Text>
							<Flex align='center' >
								{salesperson_data?.open_to_consultancy? 
									<Text fontWeight='bold' color='#009393' ><DoneAllIcon/> Open for Cosultancy</Text>
								:
									null
								}
							</Flex>
					</Flex>
 				</Flex>
 				<Flex direction='column' gap='2' p='1'>
 					<Text fontWeight='bold'>Bio</Text>
 					<Text p='2' bg='#eee' borderRadius='5' boxShadow='lg'>{salesperson_data?.bio}</Text>
 				</Flex>
 				<Flex direction='column' gap='2' p='1'>
 					<Text fontWeight='bold'>Payment Method</Text>
 					<Text p='2' bg='#eee' borderRadius='5' boxShadow='lg'>{salesperson_data?.payment_method}</Text>
 				</Flex>
 				<Flex direction='column' gap='2' p='1'>
 					<Text fontWeight='bold'>Sales summary</Text>
 					<Flex direction='column' gap='2' bg='#eee' p='1' boxShadow='lg'>
		 				<Text><span style={{fontWeight:'bold'}}>Number of sales</span>: {orders_data?.length}</Text>
		 				<Text> <span style={{fontWeight:'bold'}}>Total</span> : KES {total}</Text>
	 				</Flex>
 				</Flex>
 				<Flex gap='2' p='2' align='center'>
 					<Text fontWeight='bold'>Sales</Text>
	 				<Select w='150px' placeholder='sort sales' onChange={((e)=>{set_sort_value(e.target.value)})}>
						<option value=''>All </option>
						<option value='pending'>Pending </option>
						<option value='disbursed'>Disbursed</option>
						<option value='completed'>Completed</option>
						<option value='rejected'>Rejected</option>
					</Select>
				</Flex>
 				{orders_data?.length == 0? 
 					<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
						<Text>The User has not made any sales yet.</Text>
					</Flex>
					:
					<Flex direction='column' p='2' gap='2' overflowY='scroll' h='60vh'>
						{orders_data.map((order)=>{
							return(
								<OrderItem key={order?._id} order={order}/>
							)
						})}
					</Flex>
 				}
 				<Flex p='2' gap='2'>
					<Button flex='1' bg='#009393' color='#fff'>
	                    <Link href={`mailto: ${salesperson_data?.email_of_salesperson}`} isExternal>Email Salesperson</Link>
	                </Button>
					{salesperson_data?.suspension_status? 
						<Button flex='1' bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
						: 
						<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Salesperson;

const OrderItem=({order})=>{
	const router = useRouter();
	return(
		<Flex boxShadow='lg' p='2' bg='#fff' onClick={(()=>{router.push(`/order/${order?._id}`)})} cursor='pointer' borderRadius='5px' direction='column' position='relative' border='2px dashed #009393'>
			<Text fontSize='20px' fontWeight='bold'>Company name: {order?.company_name_of_client}</Text>
			<Text>Product Name: {order?.name_of_product}</Text>
			<Text>Total: {order?.total}</Text>
			<Flex gap='1'>
				<Text>Order Status:</Text>
				<Text color={order?.order_status === 'completed'? 'green' : 'orange'}>{order?.order_status}</Text>
			</Flex>
		</Flex>
	)
}
