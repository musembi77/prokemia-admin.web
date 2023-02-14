import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddIcon from '@mui/icons-material/Add';
import Get_Products from '../../api/Products/get_products.js'

export default function Products(){
	const router = useRouter();
	const [products_data,set_products]=useState([])
	const get_Products_Data=async()=>{
		await Get_Products().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			//console.log(data.filter(v => !v.verification_status))
			set_products(result)
		})
	}
	useEffect(()=>{
		get_Products_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Products</Text>
			{products_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
					<Text>You dont have any new products to verify.</Text>
				</Flex>
				:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{products_data?.map((product)=>{
						return(
							<div key={product._id} style={{margin:'5px'}}>
								<Item product={product} router={router}/>
							</div>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Item=({router,product})=>{
	return(
		<Flex cursor='pointer' bg='#eee' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
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
			<Text w='60px' align='center' fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/notifications/product/${product._id}`)})}>View</Text>
		</Flex>
	)
}
