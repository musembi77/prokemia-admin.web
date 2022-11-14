import React,{useState}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterDistributorModal from '../components/modals/filterDistributors.js';

function Distributors(){
	const router = useRouter();
	const [isfilterdistributorModalvisible,setisfilterdistributorModalvisible]=useState(false);
	return(
		<Flex direction='column'>
			<FilterDistributorModal isfilterdistributorModalvisible={isfilterdistributorModalvisible} setisfilterdistributorModalvisible={setisfilterdistributorModalvisible}/>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Distributors</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{setisfilterdistributorModalvisible(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search Distributors' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex wrap='flex'>
				<Distributor/>
				<Distributor/>
			</Flex>
		</Flex>
	)
}

export default Distributors;

const Distributor=()=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='./Pro.png' bg='grey' alt='photo' objectFit='cover' border='1px solid #eee'/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Button onClick={(()=>{router.push('/distributor/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}