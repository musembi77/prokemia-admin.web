import React,{useState}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterManufacturerModal from '../components/modals/filterManufacturers.js';

function Manufacturers(){
	const router = useRouter();
	const [isfiltermanufacturerModalvisible,setisfiltermanufacturerModalvisible]=useState(false);
	return(
		<Flex direction='column'>
			<FilterManufacturerModal isfiltermanufacturerModalvisible={isfiltermanufacturerModalvisible} setisfiltermanufacturerModalvisible={setisfiltermanufacturerModalvisible}/>
			<Header />
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px'>Manufacturers</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{setisfiltermanufacturerModalvisible(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search Manufacturers' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
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