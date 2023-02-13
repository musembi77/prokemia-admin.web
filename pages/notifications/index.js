//modules imports
import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
//components imports
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header.js';
//icon imports
//api calls
import Get_Products from '../api/Products/get_products.js'
import Get_Orders from '../api/orders/get_orders.js';
import Get_Distributors from '../api/distributors/get_distributors.js';
import Get_Manufacturers from '../api/manufacturers/get_manufacturers.js';
import Get_SalesPeople from '../api/salespeople/get_salespeople.js';
import Get_Industries from '../api/controls/get_industries'
import Get_Technologies from '../api/controls/get_technologies'
import Get_Requests from '../api/manufacturers/get_requests'
/*page sections*/
import Products from './product/all.js'
import Distributors from './distributor/all.js'
import Manufacturers from './manufacturer/all.js'
import Sales from './sales.js'
import Requests from './requests.js'
import Industries from './industries.js'
import Technologies from './technologies.js'
// import Sales from './inventory.js';
// import Distributors from './experts.js';
// import Manufacturers from './dashboardMenu.js';
// import Salespeople from './manufacturers.js';
// import Requests from './Premium.js'
// import Industries from './Premium.js'
// import Technologies from './Premium.js'

 
export default function Page_Handler(){
	const [currentvalue,setCurrentValue] = useState('products')
	
	const [orders_data,set_orders]=useState([]);
	const [distributors_data, set_distributors_data]=useState([]);
	const [manufacturers_data, set_manufacturers_data]=useState([]);
	const [salespeople_data, set_salespeople_data]=useState([]);
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);
	const [requests_data, set_requests_data]=useState([]);

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
		get_Orders_Data()
		get_Distributors_Data()
		get_Manufacturers_Data()
		get_SalesPeople_Data()
		get_Industries_Data()
		get_Technology_Data()
		get_Request_Data()
	},[])

	if (currentvalue == 'products')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Products/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'distributors')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody}>
						<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Distributors/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'manufacturers')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Manufacturers/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'sales')
	{
		return(
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Sales />
				</Flex>
			</Flex>
			)
	}else if (currentvalue == 'requests')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Requests/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'industries')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Industries/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'technologies')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Technologies/>
				</Flex>
			</Flex>
		)
	}else{
		return(
			<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Products/>
					</Flex>
			</Flex>
		)
	}
}

const navItems = [
 {
 	id:1,
	 title:'Products',
	 link:'products',
 },
 {
 	id:2,
	title:'Distributors',
	link:'distributors'
 },
 {
 	id:3,
	 title:'Manufacturers',
	 link:'manufacturers',
 },
 {
 	id:4,
	 title:'Sales',
	 link:'sales',
 },
 {
 	id:5,
	 title:'Requests',
	 link:'requests',
 },
  {
 	id:6,
	 title:'Industries',
	 link:'industries',
 },
  {
 	id:7,
	 title:'Technologies',
	 link:'technologies',
 }
 ]

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='2' gap='3' className={styles.consoleNavigation} cursor='pointer'>
			{navItems.map((content)=>{
				return (
					<Flex key={content.id} color={currentvalue === content.title.toLowerCase() ? '#009393': '#fff'} align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px' p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}