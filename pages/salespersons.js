import React from 'react'
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import {useRouter} from 'next/router'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function SalesPersons(){
	const router = useRouter()
	return(
		<Flex direction='column'>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >SalesPersons</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4'>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
					<option>Annonymous</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search salespersons' bg='#fff' Flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex direction='column' p='2' gap='2'>
				<SalesPerson/>
				<SalesPerson/>
			</Flex>
		</Flex>
	)
}

export default SalesPersons;

const SalesPerson=()=>{
	const router = useRouter()
	return(
		<Flex justify='space-between' align='center' w='100%' gap='' bg='#eee' borderRadius='5' p='2'>
			<Text fontWeight='bold'>Name</Text>
			<Text>Email</Text>
			<Text>Company</Text>
			<Button onClick={(()=>{router.push('/salesperson/1')})} cursor='pointer' bg='#009393'><OpenInNewIcon/><Text>View</Text></Button>
		</Flex>
	)
}