import React from 'react'
import {Flex,Text,Button,Input,Image} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'

function Manufacturers(){
	const router = useRouter()
	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Manufacturers</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee'>Sort<ArrowDropDownIcon/></Button>
				<Input placeholder='search Distributors' bg='#fff' Flex='1'/>
				<SearchIcon />
			</Flex>
			<Flex wrap='flex'>
				<Manufacturer/>
				<Manufacturer/>
			</Flex>
		</Flex>
	)
}

export default Manufacturers;

const Manufacturer=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey' alt=''/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Button onClick={(()=>{router.push('/manufacturer/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}