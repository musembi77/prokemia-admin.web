import React,{useState}from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react';
import Header from '../../../components/Header.js'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useRouter} from 'next/router';
import SuspendAccountModal from '../../../components/modals/suspendAccount.js';

function Salesperson(){
	const router = useRouter();
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);

	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible}/>
			<Header />
			<Flex p='1' direction='column' gap='2'>
				<Flex justify='space-between' gap='4'>
					<Flex direction='column' align='center'>
						<AccountBoxIcon style={{fontSize:'150px'}}/>
						<Text fontWeight='bold' fontSize='20px'>Sean Alexis</Text>
					</Flex>
					<Flex flex='1' direction='column' bg='#eee' p='2' gap='1' borderRadius='5px'>
							<Text fontWeight='bold' fontSize='20px'>Personal info</Text>
							<Text><span style={{fontWeight:'bold'}}>Name:</span> sean alex</Text>
							<Text><span style={{fontWeight:'bold'}}>Email:</span> sean@company.com</Text>
							<Text><span style={{fontWeight:'bold'}}>Mobile:</span> 0759233322</Text>
							<Text><span style={{fontWeight:'bold'}}>Status:</span> annonymous</Text>
							<Text><span style={{fontWeight:'bold'}}>Address:</span> Nairobi Kenya</Text>
							<Text><span style={{fontWeight:'bold'}}>Company:</span> Sahol</Text>
					</Flex>
 				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Specializes in Industry</Text>
					<Flex wrap='Wrap'> 
						{industries.map((item)=>{
							return(
								<Industry key={item.id} item={item}/>
							)
						})}
					</Flex>
				</Flex>
				<Button bg='#009393' color='#fff'>Contact</Button>
				<Button bg='#009393' color='#fff' >Approve Salesperson Account</Button>
				<Button bg='#fff' border='1px solid #000'>Send Note to Salesperson</Button>
				<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Decline Salesperson Account</Button>
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