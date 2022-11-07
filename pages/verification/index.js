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
			<Flex direction='column' gap='2' p='2'>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='20px' textDecoration='underline 2px solid #009393'>Products</Text>
					<Flex gap='2' wrap='Wrap'>
						<Product router={router}/>
						<Product router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='20px' textDecoration='underline 2px solid #009393'>Distributors</Text>
					<Flex gap='2' wrap='Wrap'>
						<Distributor router={router}/>
						<Distributor router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='20px' textDecoration='underline 2px solid #009393'>Manufacturers</Text>
					<Flex gap='2' wrap='Wrap'>
						<Manufacturer router={router}/>
						<Manufacturer router={router}/>
					</Flex>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold' fontSize='20px' textDecoration='underline 2px solid #009393'>SalesPersons</Text>
					<Flex gap='2' wrap='Wrap'>
						<SalesPerson/>
						<SalesPerson/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Index;

const Product=({router})=>{
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey' alt=''/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Text>Function</Text>
				<Button onClick={(()=>{router.push('/verification/product/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const Distributor=({router})=>{
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey' alt=''/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Text>Technology</Text>
				<Button onClick={(()=>{router.push('/verification/distributor/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const Manufacturer=({router})=>{
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey' alt=''/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Button onClick={(()=>{router.push('/verification/manufacturer/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

const SalesPerson=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='100%' gap='1' bg='#eee' borderRadius='5' p='2'>
			<Text fontWeight='bold'>Name</Text>
			<Text>Email</Text>
			<Text>Company</Text>
			<Text onClick={(()=>{router.push('/verification/salesperson/1')})} cursor='pointer' color='#009393'>View</Text>
		</Flex>
	)
}