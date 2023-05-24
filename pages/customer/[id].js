import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,useToast,Image,Link} from '@chakra-ui/react';
import {useRouter} from 'next/router'
import { RWebShare } from "react-web-share";
//comoponents imports
import Header from '../../components/Header.js';
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
//api calls
import Get_Client from '../api/clients/get_client.js';
import Suspend_Client from '../api/clients/suspend_client_account.js'
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Customer(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);
	const router = useRouter()
	const query = router.query;
	const toast = useToast();
	const id = query?.id

	const [client_data,set_client_data] = useState('')
	const [recents,set_recents]=useState(client_data?.recents);

	const cookies = new Cookies();
    let token = cookies.get('admin_token');
    const [auth_role,set_auth_role]=useState("")

	const payload = {
		_id : id,
		auth_role
	}
	//console.log(payload)

	const get_data=async(payload)=>{
		await Get_Client(payload).then((response)=>{
			//console.log(response?.data)
			return set_client_data(response?.data)
		})
	}
	useEffect(()=>{
		if (!payload || id === undefined){
			toast({
              title: '',
              description: `...broken link, taking you back`,
              status: 'info',
              isClosable: true,
            });
			router.push('/customers')
		}else{
			get_data(payload)
		}
		if (!token){
	        toast({
	              title: '',
	              description: `You need to signed in, to have access`,
	              status: 'info',
	              isClosable: true,
	            });
	        router.push("/")
	      }else{
	        let decoded = jwt_decode(token);
	        //console.log(decoded);
	        set_auth_role(decoded?.role)
	      }
	},[])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} client_data={client_data} acc_type={"client"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} client_data={client_data} acc_type={"client"} payload={payload}/>
			<Header />
			<Flex direction='column' p='1'>
			<Flex gap='2' p='2'>
				{client_data?.profile_photo_url == '' || !client_data?.profile_photo_url? 
					<Flex gap='2' >
						<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
					</Flex>
				: 
					<Flex gap='2' >
						<Image borderRadius='5' boxSize='150px' src={client_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
					</Flex>
				}
				<Flex direction='column'>
					<Text fontSize='28px' ml='2' fontWeight='bold'>{client_data?.first_name} {client_data?.last_name}</Text>
					{client_data?.suspension_status? 
						<Text fontWeight='bold' color='red' p='1' m='1'>Suspended</Text>
						: null
					}
				</Flex>
			</Flex>
			<Flex flex='1' gap='2' p='2' direction='column' bg='#fff' m='2' borderRadius='10px' boxShadow='lg'>
				<Text>Email: {client_data?.email_of_company}</Text>
				<Text>Mobile: {client_data?.mobile_of_company}</Text>
				<Text>Company: {client_data?.company_name}</Text>
				<Text>Address: {client_data?.address}</Text>
				<Text>Joined in : {client_data?.joined_in}</Text>
			</Flex>
			<Flex p='2' gap='2'>
				<Button flex='1' bg='#009393' color='#fff'>
                    <Link href={`mailto: ${client_data?.email_of_company}`} isExternal>Email Client</Link>
                </Button>
				{client_data?.suspension_status? 
					<Button flex='1' bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
					: 
					<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
				}
				
			</Flex>
			</Flex>
		</Flex>
	)
}

export default Customer