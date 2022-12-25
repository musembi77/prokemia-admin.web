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

function Inventory(){
	const router = useRouter();
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	const [products,set_products]=useState([])

	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			console.log(data.filter(v => v.verification_status))
			set_products(result)
		})
	}
	useEffect(()=>{
		get_Data()
	},[])
	console.log(products)
	return(
		<Flex direction='column' position='relative'>
			<Header/>
			<Flex p='2' direction='column'>
				<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Inventory</Text>
				<Flex gap='2' p='2' align='center'>
					<Button bg='#eee' p='4' onClick={(()=>{setisfilterproductModalvisible(true)})}>Filter<TuneIcon/></Button>
					<Select placeholder='sort' w='100px'> 
						<option>A - Z</option>
						<option>Z - A</option>
						<option>Featured Products</option>
					</Select>
				</Flex>
				<Flex gap='2' p='2'>
					<Input placeholder='search products' bg='#fff' flex='1'/>
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