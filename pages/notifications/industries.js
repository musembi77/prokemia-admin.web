import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Get_Industries from '../api/controls/get_industries'
import Approve_Industry from '../api/controls/approve_industry'
import Delete_Industry from '../api/controls/delete_industry.js';

export default function Industries(){
	const router = useRouter();
	
	const [industries_data, set_industries_data]=useState([]);

	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.verification_status)
			console.log(data.filter(v => !v.verification_status))
			set_industries_data(result)
		})
	}
	
	useEffect(()=>{
		get_Industries_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Industries</Text>
			{industries_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5' >
					<Text>You dont have new industries to verify.</Text>
				</Flex>
			:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{industries_data?.map((item)=>{
						return(
							<Industry item={item} key={item._id}/>
						)
					})}
				</Flex>
			}
		</Flex>
	)
}

const Industry=({item})=>{
	const router = useRouter();
	const toast = useToast()
	const payload = {
		_id : item?._id
	}
	const handle_approve_industry=async()=>{
		await Approve_Industry(payload).then(()=>{
			toast({
              title: '',
              description: `${item?.title} has been approved`,
              status: 'info',
              isClosable: true,
            });
		}).catch((err)=>{
			toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              isClosable: true,
            });
		})
	}
	const handle_delete_industry=async()=>{
		await Delete_Industry(payload).then(()=>{
			toast({
              title: '',
              description: `${item?.title} has been deleted`,
              status: 'info',
              isClosable: true,
            });
		}).catch((err)=>{
			console.log(err)
			toast({
              title: '',
              description: 'could not delete this industry',
              status: 'error',
              isClosable: true,
            });
		})
	}
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2' gap='2'>
			<Text fontWeight='bold' fontSize='20px'>Title: {item?.title}</Text>
			<Text>Description: {item?.description}</Text>
			<Flex gap='2'>
				<Button flex='1' bg='#000' color='#fff' onClick={handle_approve_industry}>Approve</Button> 
				<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={handle_delete_industry}>Delete</Button> 
			</Flex>
		</Flex>
	)
}