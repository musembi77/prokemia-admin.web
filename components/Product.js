import React from 'react'
import {Flex,Text,Button,Image} from '@chakra-ui/react'
import {useRouter} from 'next/router'

function Product(){
	const router = useRouter()
	return(
		<Flex direction='column' m='1' w='180px' gap='1' bg='#eee' borderRadius='5'>
			<Image h='50px' src='' bg='grey'/>
			<Flex p='2' direction='column'>
				<Text>Name</Text>
				<Text>Industry</Text>
				<Text>Function</Text>
				<Button onClick={(()=>{router.push('/product/1')})} bg='#009393' color='#fff'>View</Button>
			</Flex>
		</Flex>
	)
}

export default Product