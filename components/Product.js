import React from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

function Product({sponsored}){
	const router = useRouter()
	return(
		<Flex boxShadow='lg' bg='#fff' borderRadius='5px' direction='column' m='1' w='250px' position='relative'>
			{sponsored?
			<Flex position='absolute' top='1' right='1' p='1' bg='#009393' borderRadius='5' color='#fff'>
				<DoneAllOutlinedIcon />
			</Flex>
			: null}
			<Flex p='2' direction='column' w='200px' gap='2'>
				<Text color='#009393' fontWeight='bold' fontSize="24px">Cereal</Text>
				<Flex>
					<Text fontWeight='bold'>Industry:</Text>
					<Text>Agriculture</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Technology:</Text>
					<Text>crops</Text>
				</Flex>
				<Flex gap='2'>
					<Text fontWeight='bold'>Brand:</Text>
					<Text></Text>
				</Flex>
				<Text fontWeight='bold' p='1' cursor='pointer' onClick={(()=>{router.push(`/product/1`)})}>View product -&gt;  </Text>
			</Flex>
			</Flex>
	)
}

export default Product