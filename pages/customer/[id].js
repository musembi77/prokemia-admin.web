import React,{useState,useEffect}from 'react';
import {Flex,Text,Button} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//comoponents imports
import Header from '../../components/Header.js';
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
//api calls
import Get_Client from '../api/clients/get_client.js';
import Suspend_Client from '../api/clients/suspend_client_account.js'


function Customer(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);
	const router = useRouter()
	const query = router.query
	const id = query.id

	const [client_data,set_client_data] = useState('')
	const [recents,set_recents]=useState(client_data?.recents)

	const payload = {
		_id : id
	}
	//console.log(payload)
	

	const get_data=async(payload)=>{
		await Get_Client(payload).then((response)=>{
			//console.log(response)
			return set_client_data(response.data)
		})
	}
	
	const handle_suspension=async()=>{
		await Suspend_Client(payload).then(()=>{
			alert("account suspended")
		})
	}
	useEffect(()=>{
		if (!payload || payload._id === undefined){
			alert("missing info could not fetch data")
			router.back()
		}else{
			get_data(payload)
		}
	},[])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} client_data={client_data} acc_type={"client"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} client_data={client_data} acc_type={"client"} payload={payload}/>
			<Header />
			<Flex direction='column' p='1'>
			<Flex gap='1'>
			<Text fontSize='28px' ml='2' fontWeight='bold'>{client_data?.first_name} {client_data?.last_name}</Text>
			{client_data.suspension_status? 
				<Text fontSize='16px' opacity='.6' border='1px solid red' w='100px' p='1' m='1'>Suspended</Text>
				: null
			}
			</Flex>
			<Flex gap='2' p='2' direction='column' bg='#fff' m='2' borderRadius='10px' boxShadow='dark-lg'>
				<Text>Email: {client_data?.email_of_company}</Text>
				<Text>Mobile: {client_data?.mobile_of_company}</Text>
				<Text>Company: {client_data?.company_name}</Text>
				<Text>Address: {client_data?.address}</Text>
				<Text>Joined in : {client_data?.joined_in}</Text>
			</Flex>
			<Flex direction='column' m='2'>
				<Text fontSize='20px' fontWeight='bold'>Recent Searches</Text>
				{recents?.length === 0 ? 
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
					<Flex h='10vh' bg='#eee' p='2' borderRadius='5' direction='column' justify='center' align='center'>
						<Text>User has no search history</Text>
					</Flex>
				}
			</Flex>
			<Flex direction='column' p='2' gap='2'>
				<Button bg='#009393' color='#fff'>Contact</Button>
				{client_data.suspension_status? 
					<Button bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
					: 
					<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
				}
				
			</Flex>
			</Flex>
		</Flex>
	)
}

export default Customer