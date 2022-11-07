import React,{useState}from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../components/Header.js'
import SuspendAccountModal from '../../components/modals/suspendAccount.js';

function Distributor(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible}/>
			<Text fontWeight='bold' fontSize='24px'>Distributor Name</Text>
			<Flex p='1' direction='column' gap='2'>
				<Flex direction='column' bg='#eee' p='2'>
						<Text fontWeight='bold' fontSize='20px'>Contacts</Text>
						<Text>Email</Text>
						<Text>Mobile</Text>
						<Text>Address</Text>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold'>Description</Text>
					<Text>Develop innovative new formulations to meet application needs, optimize performance and improve the overall environmental profile of final formulations with Croda’s specialty chemical ingredients and performance additives. From consumer products to industrial scale challenges, we can help you formulate cost-effective, powerful and efficient new products for the newest cleaning technologies, while helping you meet the most demanding industry standards and regulations</Text>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Distributor</Text>
					<Flex wrap='Wrap'> 
						{industries.map((item)=>{
							return(
								<Industry key={item.id} item={item}/>
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
				<Button bg='#009393' color='#fff'>Contact Distributor by email</Button>
				<Button bg='#fff' color='red' border='1px solid red' m='2' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend</Button>
			</Flex>
		</Flex>
	)
}

export default Distributor;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' bg='#000'>
			<Image borderRadius='10px' objectFit='cover' src='' alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const industries=['Personal Care','H&I','Industrial','Cleaning ingredients']