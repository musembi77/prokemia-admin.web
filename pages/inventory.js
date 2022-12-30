//modules import
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//icons imports
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';

//components imports
import Header from '../components/Header.js'
import Product from '../components/Product.js'
import Add_New_Product from '../components/modals/addNewProduct.js';
//api-calls
import Get_Products from './api/Products/get_products.js'
import Get_Industries from './api/controls/get_industries';
import Get_Technologies from './api/controls/get_technologies'

function Inventory(){
	const router = useRouter();
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	const [products,set_products]=useState([])
	const [filter_active, set_filter_active] = useState(false);
	const [search_query,set_search_query] = useState('');
	const [industry,set_industry] = useState('');
	const [technology,set_technology] = useState('');

	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	console.log()
	useEffect(()=>{
		console.log(search_query,industry,technology)
		get_Industries_Data()
		get_Technology_Data()
		Get_Products().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result =  data.filter(v => v.verification_status)
			const result_data = result?.filter((item) => 	item?.industry.includes(search_query) ||
														item?.technology.includes(search_query) ||
														item?.name_of_product.toLowerCase().includes(search_query) ||
														item?.brand.toLowerCase().includes(search_query) ||
														item?.function.toLowerCase().includes(search_query) ||
														item?.chemical_name.toLowerCase().includes(search_query) ||
														item?.features_of_product.toLowerCase().includes(search_query) ||
														item?.manufactured_by.includes(search_query) ||
														item?.description_of_product.toLowerCase().includes(search_query))		
			console.log(result_data)
			set_products(result_data)
		})

	},[search_query,industry,technology])

	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_products(result)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		})
	}
	console.log(products)
	return(
		<Flex direction='column' position='relative'>
			<Header/>
			<Flex p='2' direction='column'>
				<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Inventory</Text>
				{filter_active? 
					<FilterBar technologies_data={technologies_data} industries_data={industries_data} set_filter_active={set_filter_active} set_industry={set_industry} set_technology={set_technology} set_search_query={set_search_query}/>
					: null
				}
				<Flex gap='2' p='2' align='center'>
					<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
					<Select placeholder='sort' w='100px'> 
						<option>A - Z</option>
						<option>Z - A</option>
					</Select>
				</Flex>
				<Flex gap='2' p='2'>
					<Input placeholder='search Products' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
				{products.length === 0?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center'>
						<Text>Listed Products have not been verified <br/> or <br/> No products have been listed yet</Text>
					</Flex>
				:
					<Flex wrap='Wrap' h='90vh' overflowY='scroll' justify='space-between'>
						{products?.map((item)=>{
							return(
								<Product item={item} key={item._id}/>
							)
						})}
					</Flex>
				}
			</Flex>
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

export default Inventory;

const FilterBar=({set_filter_active,set_industry,set_technology,set_search_query,industries_data,technologies_data})=>{
	return(
			<Flex color='#fff' direction='column' gap='3' p='4' w='50vw' h='90vh' bg='#090F14' position='absolute' top='75px' left='0px' zIndex='2' boxShadow='dark-lg'>
				<Flex justify='space-between' p='2'>
					<Text>Filter results</Text>
					<Text cursor='pointer' onClick={(()=>{set_filter_active(false)})}>Close</Text>
				</Flex>
				<Flex direction='column' >
					<Text>Industry</Text>
					<Select placeholder='Industry' bg='#fff' color='#000' onChange={((e)=>{set_search_query(e.target.value)})}>
						{industries_data?.map((item)=>{
								return(
									<option key={item._id} value={item.title}>{item.title}</option>

								)
							})}
					</Select>
				</Flex>
				<Flex direction='column' >
					<Text>Technology</Text>
					<Select placeholder='Technology' bg='#fff' color='#000' onChange={((e)=>{set_search_query(e.target.value)})}>
						{technologies_data?.map((item)=>{
							return(
								<option key={item._id} value={item.title}>{item.title}</option>
							)
						})}
					</Select>
				</Flex>
				<Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_filter_active(false)})}>Filter Results</Button>
			</Flex>
	)
}