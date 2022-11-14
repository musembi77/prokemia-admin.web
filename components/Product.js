import React from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react'
import {useRouter} from 'next/router'

function Product(){
	const router = useRouter()
	return(
		<Flex bg='#eee' borderRadius='5px' direction='column' m='2' w='170px'>
			<Image bg='#fff' w='100%' h='50px' borderRadius='5px 5px 0px 0px' src='./Pro.png' objectFit='cover' border='1px solid #eee' alpt='photo'/>
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