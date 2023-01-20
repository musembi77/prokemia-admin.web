//modules imports
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image,Link,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
//comsponents imports
import Header from '../../components/Header.js'
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
//icons imports
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DoneAllIcon from '@mui/icons-material/DoneAll';
//api calls
import Get_SalesPerson from '../api/salespeople/get_salesperson.js'

function Salesperson(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const toast = useToast();
	const router = useRouter();
	const query = router.query
	const id = query.id

	const [salesperson_data,set_salesperson_data] = useState('')
	const [recents,set_recents]=useState(salesperson_data?.recents)

	const payload = {
		_id : id
	}
	const get_data=async(payload)=>{
		await Get_SalesPerson(payload).then((response)=>{
			console.log(response)
			return set_salesperson_data(response.data)
		})
	}

	useEffect(()=>{
		if (!payload || id === undefined){
			toast({
              title: '',
              description: `...broken link, redirecting you.`,
              status: 'info',
              isClosable: true,
            });
			router.push('/salespersons')
		}else{
			get_data(payload)
		}
	},[])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} salesperson_data={salesperson_data} acc_type={"salespersons"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} salesperson_data={salesperson_data} acc_type={"salespersons"} payload={payload}/>
			<Header />
			<Flex p='1' direction='column' gap='2'>
				<Flex justify='space-between' gap='4'>
					<Flex direction='column' align='center'>
						{salesperson_data?.profile_photo_url == '' || !salesperson_data?.profile_photo_url? 
							<Flex gap='2' >
								<AccountBoxIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
							</Flex>
						: 
							<Flex gap='2' >
								<Image borderRadius='5' boxSize='150px' src={salesperson_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
						<Text fontWeight='bold' fontSize='20px'>{salesperson_data?.first_name} {salesperson_data?.last_name}</Text>
						{salesperson_data?.suspension_status? 
							<Text fontSize='16px' opacity='.6' border='1px solid red' w='100px' p='1' m='1'>Suspended</Text>
							: 
							null
						}
					</Flex>
					<Flex flex='1' direction='column' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
							<Text><span style={{fontWeight:"bold"}}>Email:</span> {salesperson_data?.email_of_salesperson}</Text>
							<Text><span style={{fontWeight:"bold"}}>Mobile:</span>  {salesperson_data?.mobile_of_salesperson}</Text>
							<Text><span style={{fontWeight:"bold"}}>Address:</span> {salesperson_data?.address}</Text>
							<Text><span style={{fontWeight:"bold"}}>Company:</span>  {salesperson_data?.company_name}</Text>
							<Text><span style={{fontWeight:"bold"}}>Joined in:</span> {salesperson_data?.joined_in}</Text>
							<Flex align='center' >
								{salesperson_data?.open_to_consultancy? 
									<Text fontWeight='bold' color='#009393' ><DoneAllIcon/> Open for Cosultancy</Text>
								:
									null
								}
							</Flex>
					</Flex>
 				</Flex>
 				<Flex p='2' gap='2'>
					<Button flex='1' bg='#009393' color='#fff'>
	                    <Link href={`mailto: ${salesperson_data?.email_of_salesperson}`} isExternal>Email Salesperson</Link>
	                </Button>
					{salesperson_data?.suspension_status? 
						<Button flex='1' bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
						: 
						<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
					}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Salesperson;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' bg='#000'>
			<Image borderRadius='10px' objectFit='cover' src='' alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const industries=['Personal Care','H&I','Industrial','Cleaning ingredients']