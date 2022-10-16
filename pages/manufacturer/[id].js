import React from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../components/Header.js';
import Product from '../../components/Product.js';
import {useRouter} from 'next/router';

function Manufacturer(){
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Text fontWeight='bold' fontSize='24px'>Manufacturer Name</Text>
			<Flex p='1' direction='column' gap='2'>
				<Flex direction='column' bg='#eee' p='2'>
						<Text fontWeight='bold' fontSize='20px'>Contacts</Text>
						<Text>Email</Text>
						<Text>Mobile</Text>
						<Text>Address</Text>
						<Button bg='#009393' color='#fff'>Contact by Email</Button>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold'>Description</Text>
					<Text>Develop innovative new formulations to meet application needs, optimize performance and improve the overall environmental profile of final formulations with Croda’s specialty chemical ingredients and performance additives. From consumer products to industrial scale challenges, we can help you formulate cost-effective, powerful and efficient new products for the newest cleaning technologies, while helping you meet the most demanding industry standards and regulations</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Manufacturer</Text>
					<Flex wrap='Wrap'> 
						{industries.map((item)=>{
							return(
								<Industry item={item}/>
							)
						})}
					</Flex>
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
					<Flex direction='column' bg='#eee' p='2'>
						<Text>Name</Text>
						<Text>Mobile</Text>
					</Flex>
					<Flex direction='column' bg='#eee' p='2'>
						<Text>Name</Text>
						<Text>Mobile</Text>
					</Flex>
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Products</Text>
					<Flex wrap='Wrap' p='2'>
						<Product />
						<Product />
						<Product />
						<Product />
					</Flex>
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Distributors</Text>
					<Flex wrap='Wrap' p='2'>
						<Distributor />
						<Distributor />
					</Flex>
				</Flex>
				<Button m='2' bg='#fff' color='red' border='1px solid red' >Suspend</Button>
			</Flex>
		</Flex>
	)
}

export default Manufacturer;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' bg='#000'>
			<Image borderRadius='10px' objectFit='cover' src='' alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const industries=['Personal Care','H&I','Industrial','Cleaning ingredients']

const Distributor=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey'/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Button onClick={(()=>{router.push('/distributor/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}