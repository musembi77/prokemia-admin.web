//modules import
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Input,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//icons imports
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
//components imports
import Header from '../components/Header.js'
import Product from '../components/Product.js'
import Add_New_Product from '../components/modals/addNewProduct.js';
//api-calls
import Get_Products from './api/Products/get_products.js'
import Get_Industries from './api/controls/get_industries';
import Get_Technologies from './api/controls/get_technologies';

export default function Inventory(){
	const router = useRouter();
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	const [products,set_products]=useState([]);
	const [filter_active, set_filter_active] = useState(false);
	const [search_query,set_search_query] = useState('');
	const [industry,set_industry] = useState('');
	const [technology,set_technology] = useState('');
	const [sort,set_sort]=useState('desc')

	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	//console.log()
	useEffect(()=>{
		//console.log(search_query,industry,technology)
		get_Industries_Data()
		get_Technology_Data()
		Get_Products().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result =  data.filter(v => v.verification_status)
			const result_data = result?.filter((item) => 	item?.industry.includes(search_query.toLowerCase()) ||
														item?.technology.includes(search_query.toLowerCase()) ||
														item?.email_of_lister.includes(search_query.toLowerCase()) ||
														item?.name_of_product.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.brand.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.function.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.chemical_name.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.features_of_product.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.manufactured_by.toLowerCase().includes(search_query.toLowerCase()) ||
														item?.description_of_product.toLowerCase().includes(search_query.toLowerCase()))		
			//console.log(result_data)
			if (sort == 'desc'){
				const sorted_result = result_data.sort((a, b) => a.name_of_product.localeCompare(b.name_of_product))	
				set_products(sorted_result)
			}else{
				const sorted_result = result_data.sort((a, b) => b.name_of_product.localeCompare(a.name_of_product))
				set_products(sorted_result)
			}
			
		})

	},[search_query,industry,technology,sort])

	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_products(result)
		})
	}
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		})
	}
	//console.log(products)

	return(
		<Flex direction='column' position='relative'>
			<Header/>
			<Flex p='2' direction='column'>
				<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Inventory ({products?.length})</Text>
				{filter_active? 
					<FilterBar technologies_data={technologies_data} industries_data={industries_data} set_filter_active={set_filter_active} set_industry={set_industry} set_technology={set_technology} set_search_query={set_search_query}/>
					: null
				}
				<Flex gap='2' p='2' align='center'>
					<Button bg='#eee' p='4' onClick={(()=>{set_filter_active(true)})}>Filter<TuneIcon/></Button>
					<Select placeholder='sort' w='100px' onChange={((e)=>{set_sort(e.target.value)})}> 
						<option value='desc'>A - Z</option>
						<option value='asc'>Z - A</option>
					</Select>
				</Flex>
				<Flex gap='2' p='2'>
					<Input placeholder='search Products by Name, Industry, Technology...' bg='#fff' flex='1' onChange={((e)=>{set_search_query(e.target.value)})}/>
					<Button bg='#009393' color='#fff'><SearchIcon /></Button>
				</Flex>
				{products?.length === 0?
					<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center'>
						<Text>Listed Products have not been verified <br/> or <br/> No products meet your search terms</Text>
					</Flex>
				:
					<Flex direction='column' gap='2' justify=''>
						{products?.map((product)=>{
							return(
								<Product_Item product={product} key={product._id}/>
							)
						})}
					</Flex>
				}
			</Flex>
			<Circle _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all'}} onClick={(()=>{router.push('/product/add_product')})} boxShadow='dark-lg' cursor='pointer' color='#fff' boxSize='60px' bg='#009393' position='fixed' bottom='20px' right='20px'><AddIcon/></Circle>
		</Flex>
	)
}

const FilterBar=({set_filter_active,set_industry,set_technology,set_search_query,industries_data,technologies_data})=>{
	const Handle_Clear=()=>{
		set_search_query('')
		set_filter_active(false)
	}
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
				<Button bg='#fff' borderRadius='0' color='#000' onClick={Handle_Clear}>Clear Filter Results</Button>
			</Flex>
	)
}

const Product_Item=({product})=>{
	const router = useRouter()
	return(
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#fff' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
			<Flex direction='column' position='relative' p='2'>
				<Text color='#009393' fontWeight='bold' fontSize="24px">{product?.name_of_product}</Text>
				<Flex gap='2'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{product?.industry}</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{product?.technology}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' justify='space-around' p='2' textAlign='center'>
				{product?.sponsored ? 
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' align='center'>
						<Text fontWeight='bold' >Featured</Text>
						<VerifiedIcon style={{color:'gold'}}/>
					</Flex>
					:
					<Text fontWeight='bold' >Not Featured</Text>				
				}
				<Text fontWeight='bold' color='#fff' bg='#009393' p='1' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`product/${product?._id}`)})}>View</Text>
			</Flex>
		</Flex>
	)
}