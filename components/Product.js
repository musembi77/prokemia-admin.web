import React from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

function Product({item}){
	const router = useRouter()
	return(
		<Flex boxShadow='lg' bg='#fff' borderRadius='5px' direction='column' m='2' w='350px' position='relative' h='300px' justify='space-between'>
			<Flex p='2' direction='column' w='100%' gap='2'>
				<Text color='#009393' fontWeight='bold' fontSize="24px" w='100%'>{item?.name_of_product}</Text>
				<Flex direction='column'>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>{item?.industry}</Text>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>{item?.technology}</Text>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold'>Brand:</Text>
					<Text>{item?.brand}</Text>
				</Flex>
				<Flex direction='column'>
					<Text fontWeight='bold'>Manufactured by:</Text>
					<Text>{item?.manufactured_by}</Text>
				</Flex>
			</Flex>
			<Button m='1' color='#fff' bg='#009393' p='1' cursor='pointer' onClick={(()=>{router.push(`/product/${item?._id}`)})} border='1px solid #009393'>View product</Button>
		</Flex>
	)
}

export default Product;