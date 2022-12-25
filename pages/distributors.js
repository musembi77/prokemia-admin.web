import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Image,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useRouter} from 'next/router'
import TuneIcon from '@mui/icons-material/Tune';
import FilterDistributorModal from '../components/modals/filterDistributors.js';
import Get_Distributors from '../pages/api/distributors/get_distributors.js';

function Distributors(){
	const router = useRouter();
	const [isfilterdistributorModalvisible,setisfilterdistributorModalvisible]=useState(false);
	const [distributors_data, set_distributors_data]=useState([]);

	useEffect(()=>{
		Get_Distributors().then((response)=>{
			console.log(response.data)
			set_distributors_data(response.data);
		})
	},[])
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
			<Flex p='2' gap='2'>
				{distributors_data?.map((distributor_data)=>{
					return(
						<div key={distributor_data._id} >
							<Distributor distributor_data={distributor_data}/>
						</div>
					)
				})}
			</Flex>
		</Flex>
	)
}

export default Distributors;

const Distributor=({distributor_data})=>{
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='225px' boxShadow='dark-lg' h='200px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='70px' src='./Pro.png' bg='grey' alt='photo' objectFit='cover' border='1px solid #eee'/>
			<Flex p='2' direction='column' flex='1' justify='space-between'>
				<Text>{distributor_data.company_name}</Text>
				<Text fontSize='14px'>{distributor_data.mobile_of_company}</Text>
				<Text fontSize='14px'>{distributor_data.email_of_company}</Text>
				<Button onClick={(()=>{router.push(`/distributor/${distributor_data._id}`)})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}