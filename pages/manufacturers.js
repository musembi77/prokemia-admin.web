import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterManufacturerModal from '../components/modals/filterManufacturers.js';
import Get_Manufacturers from '../pages/api/manufacturers/get_manufacturers.js';

function Manufacturers(){
	const router = useRouter();
	const [isfiltermanufacturerModalvisible,setisfiltermanufacturerModalvisible]=useState(false);
	const [manufacturers_data, set_manufacturers_data]=useState([]);

	useEffect(()=>{
		Get_Manufacturers().then((response)=>{
			console.log(response.data)
			set_manufacturers_data(response.data);
		})
	},[])
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
					<option>Sponsored</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search Manufacturers' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex p='2' gap='2'>
				{manufacturers_data?.map((manufacturer_data)=>{
					return(
						<div key={manufacturer_data._id} >
							<Manufacturer manufacturer_data={manufacturer_data}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Manufacturers;

const Manufacturer=({manufacturer_data})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='225px' boxShadow='dark-lg' h='200px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='70px' src='./Pro.png' bg='grey' alt='photo' objectFit='cover' border='1px solid #eee'/>
			<Flex p='2' direction='column' flex='1' justify='space-between'>
				<Text fontWeight='bold'>{manufacturer_data.company_name}</Text>
				<Text fontSize='14px'>{manufacturer_data.mobile_of_company}</Text>
				<Text fontSize='14px'>{manufacturer_data.email_of_company}</Text>
				<Button onClick={(()=>{router.push(`/manufacturer/${manufacturer_data._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}