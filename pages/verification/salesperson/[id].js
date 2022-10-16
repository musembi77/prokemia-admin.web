import React from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../../components/Header.js'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useRouter} from 'next/router';

function Salesperson(){
	const router = useRouter()
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Flex p='1' direction='column' gap='2'>
				<Flex justify='space-between' gap='4'>
					<Flex direction='column' align='center'>
						<AccountBoxIcon style={{fontSize:'100px'}}/>
						<Text fontWeight='bold' fontSize='20px'>Sean Alexis</Text>
					</Flex>
					<Flex flex='1' direction='column' bg='#eee' p='2'>
							<Text fontWeight='bold' fontSize='20px'>Personal info</Text>
							<Text>Email: sean@company.com</Text>
							<Text>Mobile: 0759233322</Text>
							<Text>Address:Nairobi KEnya</Text>
							<Text>Company: Sahol</Text>
					</Flex>
 				</Flex>
				<Button bg='#009393' color='#fff'>Contact</Button>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Specializes in Industry</Text>
					<Flex wrap='Wrap'> 
						{industries.map((item)=>{
							return(
								<Industry item={item}/>
							)
						})}
					</Flex>
				</Flex>
				<Button bg='#009393' color='#fff' m='2'>Approve Salesperson Account</Button>
				<Button bg='#fff' border='1px solid #000' m='2'>Send Note to Salesperson</Button>
				<Button bg='#fff' color='red' border='1px solid red' m='2'>Decline Salesperson Account</Button>
			</Flex>
		</Flex>
	)
}

export default Salesperson;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' bg='#000'>
			<Image borderRadius='10px' objectFit='cover' src='' alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const industries=['Personal Care','H&I','Industrial','Cleaning ingredients']