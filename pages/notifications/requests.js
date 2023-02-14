import React,{useState,useEffect} from 'react'
import {Flex,Image,Text,Input,Button,Select,Circle} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Get_Requests from '../api/manufacturers/get_requests'
import Complete_Requests from '../api/manufacturers/complete_requests'

export default function Requests(){
	const router = useRouter();
	
	const [requests_data, set_requests_data]=useState([]);

	const get_Request_Data=async()=>{
		await Get_Requests().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => !v.complete_request)
			//// console.log(data.filter(v => !v.verification_status))
			set_requests_data(result)
		})
	}
	
	useEffect(()=>{
		get_Request_Data()
	},[])
	return(
		<Flex direction='column' gap='3' p='2' w='100%'>
			<Text fontSize='32px' fontWeight='bold' color ='#009393'>Requests</Text>
			{requests_data?.length === 0?
				<Flex justify='center' align='center' h='40vh' direction='column' gap='2' textAlign='center' bg='#eee' borderRadius='5'>
					<Text>You dont have new requests to verify.</Text>
				</Flex>
			:
				<Flex direction='column' overflowY='scroll' h='80vh'>
					{requests_data?.map((item)=>{
							return(
								<Requests_Item item={item} key={item._id}/>
							)
						})}
					</Flex>
			}
		</Flex>
	)
}

const Requests_Item=({item})=>{
	const payload = {
		_id : item._id
	}
	const handle_complete_request=async()=>{
		await Complete_Requests(payload).then(()=>{
			alert("success")
		})
	}
	return(
		<Flex direction='column' bg='#eee' boxShadow='lg' borderRadius='5' m='2' p='2' w='100%' justify='space-between'>
			<Flex direction='column'>
				<Text>Requested by: <span style={{fontWeight:"bold"}}>{item?.name_of_requester}</span></Text>
				<Text>Industry: <span style={{fontWeight:"bold"}}>{item?.industry}</span></Text>
				<Text>Technology: <span style={{fontWeight:"bold"}}>{item?.technology}</span></Text>
				<Text>Region: <span style={{fontWeight:"bold"}}>{item?.region}</span></Text>
				<Text>description: <span style={{fontWeight:"bold"}}>{item?.description}</span></Text>
			</Flex>
			<Flex gap='2'>
				<Button bg='#009393' color='#fff' flex='1' onClick={handle_complete_request}>Complete</Button>
			</Flex>
		</Flex>
	)
}