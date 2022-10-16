import React from 'react'
import {Flex,Text,Button,Input} from '@chakra-ui/react'
import Header from '../components/Header.js'
import SearchIcon from '@mui/icons-material/Search';
import Product from '../components/Product.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Inventory(){
	return(
		<Flex direction='column'>
			<Header/>
			<Text m='2' fontFamily='ClearSans-Bold' fontSize='24px' >Inventory</Text>
			<Flex gap='2' p='2' align='center'>
				<Button bg='#eee'>Sort<ArrowDropDownIcon/></Button>
				<Input placeholder='search products' bg='#fff' Flex='1'/>
				<SearchIcon />
			</Flex>

			<Flex wrap='flex'>
				<Product/>
				<Product/>
			</Flex>
		</Flex>
	)
}

export default Inventory;
