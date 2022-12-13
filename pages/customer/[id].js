import React,{useState,useEffect}from 'react';
import {Flex,Text,Button} from '@chakra-ui/react';
import Header from '../../components/Header.js';
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Get_Client from '../api/clients/get_client.js';
import {useRouter} from 'next/router'

function Customer(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const router = useRouter()
	const query = router.query
	const [client_data,set_client_data] = useState('')
	const id = query.id
	const [recents,set_secents]=useState(client_data.recents)
	useEffect(()=>{
		if (!id){
			alert("missing info could not fetch data")
			return router.back()
		}else{
			Get_Client(id).then((response)=>{
				set_client_data(response.data);
			})
		}
	},[])
	return(
		<Flex direction='column' gap='2'>
		<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible}/>
			<Header />
			<Text fontWeight='bold' fontSize='28px'>Customer Information</Text>
			<Flex gap='2' p='2' direction='column' bg='#eee' m='2' borderRadius='10px'>
				<Text fontSize='24px'>{client_data.first_name} {client_data.last_name}</Text>
				<Text>Email: {client_data.email_of_company}</Text>
				<Text>Mobile: {client_data.mobile_of_company}</Text>
				<Text>Company: {client_data.company_name}</Text>
				<Text>Address: {client_data.address}</Text>
				<Text>Joined in : {client_data.joined_in}</Text>
			</Flex>
			<Flex direction='column' m='2'>
				<Text fontSize='20px' fontWeight='bold'>Recent Searches</Text>
				{recents?.length !== 0 ? 
					<Flex>
						{recents?.map((recent)=>{
							return(
								<Flex bg='#eee' p='2' borderRadius='5' direction='column'>
									<Text>{recent.Name}</Text>
									<Text>{recent.Item}</Text>
								</Flex>
							)
						})}
					</Flex>
					:
					<Flex h='10vh' bg='#eee' p='2' borderRadius='5' direction='column'>
						<Text>No searches made</Text>
					</Flex>
				}
			</Flex>
			<Flex direction='column' p='2' gap='2'>
			<Button bg='#009393' color='#fff'>Contact</Button>
			<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
			</Flex>
		</Flex>
	)
}

export default Customer
