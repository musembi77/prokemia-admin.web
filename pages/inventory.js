import React,{useState}from 'react';
import {Flex,Text,Button,Input,Select} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import Product from '../components/Product.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TuneIcon from '@mui/icons-material/Tune';
import FilterProductModal from '../components/modals/filterProduct.js';

function Inventory(){
	const [isfilterproductModalvisible,setisfilterproductModalvisible]=useState(false);
	return(
		<Flex direction='column'>
			<FilterProductModal isfilterproductModalvisible={isfilterproductModalvisible} setisfilterproductModalvisible={setisfilterproductModalvisible}/>
			<Header/>
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Inventory</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee' p='4' onClick={(()=>{setisfilterproductModalvisible(true)})}>Filter<TuneIcon/></Button>
				<Select placeholder='sort' w='100px'> 
					<option>A - Z</option>
					<option>Z - A</option>
				</Select>
			</Flex>
			<Flex gap='2' p='2'>
				<Input placeholder='search products' bg='#fff' flex='1'/>
				<Button bg='#009393' color='#fff'><SearchIcon /></Button>
			</Flex>
			<Flex wrap='flex'>
				<Product/>
				<Product/>
			</Flex>
		</Flex>
	)
}

export default Inventory;
