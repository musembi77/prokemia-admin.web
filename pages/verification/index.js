import React from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../components/Header.js';
import {useRouter} from 'next/router'

function Index(){
	const router=useRouter()
	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Text m='1' borderBottom='1px solid #009393' fontSize='24px' fontWeight='bold'>Verification dashboard</Text>
			<Text m='1'>You have Pending multiple new Items to verify.</Text>
			<Flex direction='column' gap='2' p='2' mb='2'>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Products</Text>
					<Flex gap='2' wrap='Wrap'>
						<Product router={router}/>
						<Product router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Orders</Text>
					<Flex gap='2' wrap='Wrap'>
						<Orders/>
						<Orders/>
						<Orders/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Distributors</Text>
					<Flex gap='2' wrap='Wrap'>
						<Distributor router={router}/>
						<Distributor router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Manufacturers</Text>
					<Flex gap='2' wrap='Wrap'>
						<Manufacturer router={router}/>
						<Manufacturer router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>SalesPersons</Text>
					<Flex gap='2' wrap='Wrap'>
						<SalesPerson/>
						<SalesPerson/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Requests</Text>
					<Requests/>
					<Requests/>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='24px' textDecoration='underline 2px solid #009393'>Suggestions</Text>
					<Industry/>
					<Technology/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Index;

const Product=({router})=>{
	return(
		<Flex direction='column' m='1' w='300px' gap='2' bg='#eee' borderRadius='5' boxShadow='lg'>
			<Flex p='2' direction='column'>
				<Text>Name of Product</Text>
				<Text>Industry</Text>
				<Text>Function</Text>
				<Button onClick={(()=>{router.push('/verification/product/1')})} bg='#009393' color='#fff'>View Product</Button>
			</Flex>
		</Flex>
	)
}

const Distributor=({router})=>{
	return(
		<Flex direction='column' m='1' w='300px' gap='1' bg='#eee' borderRadius='5' boxShadow='lg'>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Text>Technology</Text>
				<Text>Subscription: <span style={{color:'orange'}}>Not Subscribed</span></Text>
				<Button onClick={(()=>{router.push('/verification/distributor/1')})} bg='#000' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const Manufacturer=({router})=>{
	return(
		<Flex direction='column' m='1' w='300px' gap='1' bg='#eee' borderRadius='5' boxShadow='lg'>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Text>Technology</Text>
				<Text>Subscription : <span style={{color:"orange"}}>Subscribed</span></Text>
				<Button onClick={(()=>{router.push('/verification/manufacturer/1')})} bg='#000' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const SalesPerson=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='200px' gap='1' bg='#eee' borderRadius='5' p='2' boxShadow='lg'>
			<Text fontWeight='bold'>Name</Text>
			<Text>Email</Text>
			<Text>Company</Text>
			<Text onClick={(()=>{router.push('/verification/salesperson/1')})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}

const Orders=()=>{
	const router = useRouter();
	return(
		<Flex direction='column' m='1' w='300px' bg='#eee' borderRadius='5' p='2' boxShadow='lg' onClick={(()=>{router.push('/order/1')})}>
			<Text>Name of SalesPerson</Text>
			<Text>Unit Price: 200 </Text>
			<Text>Volume: 1000units</Text>
			<Text>Date: 21-11-2022</Text>
			<Button bg='#000' color='#fff'>View Order</Button>
		</Flex>
	)
}

const Requests=()=>{
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2'>
			<Text>Requested by: </Text>
			<Text>Industry: </Text>
			<Text>Technology: </Text>
			<Text>Region: East Africa</Text>
			<Button bg='#000' color='#fff'>contact</Button> 
		</Flex>
	)
}

const Industry=()=>{
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2'>
			<Text>Industry: </Text>
			<Text>Suggested by: </Text>
			<Text>Contact :</Text>
			<Text>Description: </Text>
			<Flex gap='2'>
				<Button bg='#000' color='#fff'>Approve</Button> 
				<Button bg='#fff' color='red' border='1px solid red'>Decline</Button> 
			</Flex>
		</Flex>
	)
}

const Technology=()=>{
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2'>
			<Text>Technology: </Text>
			<Text>Suggested by: </Text>
			<Text>Contact :</Text>
			<Text>Description: </Text>
			<Flex gap='2'>
				<Button bg='#000' color='#fff'>Approve</Button> 
				<Button bg='#fff' color='red' border='1px solid red'>Decline</Button> 
			</Flex>
		</Flex>
	)
}
