import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../components/Header.js';
import {useRouter} from 'next/router'
import Get_Products from '../api/Products/get_products.js'
import Get_Orders from '../api/orders/get_orders.js';
import Get_Distributors from '../api/distributors/get_distributors.js';
import Get_Manufacturers from '../api/manufacturers/get_manufacturers.js';
import Get_SalesPeople from '../api/salespeople/get_salespeople.js';
import Get_Industries from '../api/controls/get_industries'
import Approve_Industry from '../api/controls/approve_industry'
import Get_Technologies from '../api/controls/get_technologies'
import Approve_Technology from '../api/controls/approve_technology'
import Get_Requests from '../api/manufacturers/get_requests'
import Complete_Requests from '../api/manufacturers/complete_requests'

function Index(){
	const router=useRouter();

	const [products,set_products]=useState([])
	const [orders_data,set_orders]=useState([]);
	const [distributors_data, set_distributors_data]=useState([]);
	const [manufacturers_data, set_manufacturers_data]=useState([]);
	const [salespeople_data, set_salespeople_data]=useState([]);
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);
	const [requests_data, set_requests_data]=useState([]);

	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_products(result)
		})
	}
	const get_Orders_Data=async()=>{
		await Get_Orders().then((response)=>{
			let data = response.data
			console.log(data)
			const result = data.filter((item)=> !item.order_notification_status)
			set_orders(result)
		})
	}
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_distributors_data(result)
		})
	}
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_manufacturers_data(result)
		})
	}
	const get_SalesPeople_Data=async()=>{
		await Get_SalesPeople().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_salespeople_data(result)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_technologies_data(result)
		})
	}
	const get_Request_Data=async()=>{
		await Get_Requests().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.complete_request)
			// console.log(data.filter(v => !v.verification_status))
			set_requests_data(result)
		})
	}
	useEffect(()=>{
		get_Products_Data()
		get_Orders_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
		get_SalesPeople_Data()
		get_Industries_Data()
		get_Technology_Data()
		get_Request_Data()
	},[])

	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Text m='1' borderBottom='1px solid #009393' fontSize='24px' fontWeight='bold'>Notifications</Text>
			<Text m='1'>You have Pending Items to verify.</Text>
			<Flex direction='column' gap='2' p='2' mb='2'>
				<Flex direction='column' h='50vh'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Products</Text>
					{products?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have new Listed Products to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' overflowY='scroll' h='100%'>
							{products?.map((item)=>{
								return(
									<Product item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Orders</Text>
					{orders_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have any orders to view.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' h='50vh' overflowY='scroll'>
							{orders_data?.map((item)=>{
								return(
									<Orders item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Distributors</Text>
					{distributors_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have new distributors to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' h='50vh' overflowY='scroll'>
							{distributors_data?.map((item)=>{
								return(
									<Distributor item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Manufacturers</Text>
					{manufacturers_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have new manufacturers to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' h='50vh' overflowY='scroll'>
							{manufacturers_data?.map((item)=>{
								return(
									<Manufacturer item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>SalesPersons</Text>
					{salespeople_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have new salespeople to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' h='50vh' overflowY='scroll'>
							{salespeople_data?.map((item)=>{
								return(
									<SalesPerson item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Requests</Text>
					{requests_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
							<Text>You dont have new requests to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' h='50vh' overflowY='scroll'>
							{requests_data?.map((item)=>{
								return(
									<Requests item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
				<Flex direction='column' gap='2'> 
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Suggestions</Text>
					{industries_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5' >
							<Text>You dont have new industries to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' overflowY='scroll'>
							{industries_data?.map((item)=>{
								return(
									<Industry item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
					{technologies_data?.length === 0?
						<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5' >
							<Text>You dont have new technologies to verify.</Text>
						</Flex>
					:
						<Flex wrap='Wrap' overflowY='scroll'>
							{technologies_data?.map((item)=>{
								return(
									<Technology item={item} key={item._id}/>
								)
							})}
						</Flex>
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Index;

const Product=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='2' w='250px' gap='2' bg='#eee' borderRadius='5' boxShadow='dark-lg' h='250px' p='2' justify='space-between'>
			<Flex direction='column'>
				<Text fontWeight='bold' fontSize='20px'>{item?.name_of_product}</Text>
				<Text>{item?.industry}</Text>
				<Text>{item?.technology}</Text>
			</Flex>
			<Button onClick={(()=>{router.push(`/notifications/product/${item._id}`)})} bg='#009393' color='#fff'>View Product</Button>
		</Flex>
	)
}

const Distributor=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='300px' gap='1' bg='#eee' borderRadius='5' boxShadow='lg' h='175px' p='1' justify='space-between'>
			<Flex p='2' direction='column'>
				<Text fontWeight='bold' fontSize='20px'>{item?.company_name}</Text>
				<Text>{item?.email_of_company}</Text>
				<Text>{item?.address_of_company}</Text>
				<Text>Subscription: <span style={{color:'orange'}}>Not Subscribed</span></Text>
			</Flex>
			<Button onClick={(()=>{router.push(`/notifications/distributor/${item?._id}`)})} bg='#000' color='#fff'>View</Button>
		</Flex>
	)
}

const Manufacturer=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='300px' gap='1' bg='#eee' borderRadius='5' boxShadow='lg' h='175px' p='2' justify='space-between'>
			<Flex p='2' direction='column'>
				<Text fontWeight='bold' fontSize='20px'>{item?.company_name}</Text>
				<Text>{item?.email_of_company}</Text>
				<Text>{item?.address_of_company}</Text>
				<Text>Subscription: <span style={{color:'orange'}}>Not Subscribed</span></Text>
			</Flex>
			<Button onClick={(()=>{router.push(`/notifications/manufacturer/${item?._id}`)})} bg='#000' color='#fff'>View</Button>
		</Flex>
	)
}

const SalesPerson=({item})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' gap='1' bg='#eee' borderRadius='5' p='2' boxShadow='lg' h='150px' w='250px'>
			<Text fontWeight='bold' fontSize='24px'>{item?.first_name} {item?.last_name}</Text>
			<Text>{item?.email_of_salesperson}</Text>
			<Text>{item?.company_name}</Text>
			<Text onClick={(()=>{router.push(`/notifications/salesperson/${item?._id}`)})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}

const Orders=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' m='1' w='300px' bg='#eee' borderRadius='5' p='2' boxShadow='lg' h='200px'>
			<Text fontWeight='bold' fontSize='24px'>{item?.name_of_client}</Text>
			<Text>Unit Price: {item?.unit_price} </Text>
			<Text>Volume: {item?.volume_of_items} </Text>
			<Text>Total: {item?.total} </Text>
			<Text>Date: {item?.createdAt}</Text>
			<Button bg='#000' color='#fff' onClick={(()=>{router.push(`/order/${item?._id}`)})}>View Order</Button>
		</Flex>
	)
}

const Requests=({item})=>{
	const payload = {
		_id : item._id
	}
	const handle_complete_request=async()=>{
		await Complete_Requests(payload).then(()=>{
			alert("success")
		})
	}
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2' w='250px' justify='space-between'>
			<Flex direction='column'>
				<Text>Requested by: <span style={{fontWeight:"bold"}}>{item?.name_of_requester}</span></Text>
				<Text>Industry: <span style={{fontWeight:"bold"}}>{item?.industry}</span></Text>
				<Text>Technology: <span style={{fontWeight:"bold"}}>{item?.technology}</span></Text>
				<Text>Region: <span style={{fontWeight:"bold"}}>{item?.region}</span></Text>
				<Text>description: <span style={{fontWeight:"bold"}}>{item?.description}</span></Text>
			</Flex>
			<Flex gap='2'>
				<Button bg='#009393' color='#fff' flex='1' onClick={handle_complete_request}>Complete</Button>
			</Flex>
		</Flex>
	)
}

const Industry=({item})=>{
	const payload = {
		_id : item?._id
	}
	const handle_approve_industry=async()=>{
		await Approve_Industry(payload).then(()=>{
			toast({
              title: '',
              description: `${item?.title} has been approved`,
              status: 'info',
              isClosable: true,
            });
			router.back()
		}).catch((err)=>{
			toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              isClosable: true,
            });
		})
	}
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2' h='100px' gap='2'>
			<Text fontWeight='bold' fontSize='20px'>Industry: {item?.title}</Text>
			<Flex gap='2'>
				<Button bg='#000' color='#fff' onClick={handle_approve_industry}>Approve</Button> 
				<Button bg='#fff' color='red' border='1px solid red'>Decline</Button> 
			</Flex>
		</Flex>
	)
}

const Technology=({item})=>{
	const payload = {
		_id : item?._id
	}
	const handle_approve_technology=async()=>{
		await Approve_Technology(payload).then(()=>{
			toast({
              title: '',
              description: `${item?.title} has been approved`,
              status: 'info',
              isClosable: true,
            });
			router.back()
		}).catch((err)=>{
			toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              isClosable: true,
            });
		})
	}
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2' h='100px' gap='2'>
			<Text fontWeight='bold' fontSize='20px'>Technology: {item?.title}</Text>
			<Flex gap='2'>
				<Button bg='#000' color='#fff' onClick={handle_approve_technology}>Approve</Button> 
				<Button bg='#fff' color='red' border='1px solid red'>Decline</Button> 
			</Flex>
		</Flex>
	)
}
