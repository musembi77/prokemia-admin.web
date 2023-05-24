import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Button,Image,useToast,Link} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../../components/Header.js'
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
import Delete_Account_Modal from '../../components/modals/delete_account.js'
//api calls
import Get_Distributor from '../api/distributors/get_distributor.js'
import Subscribe_Account from '../api/distributors/subscribe_account.js'
import Un_Subscribe_Account from '../api/distributors/un_subscribe_account.js';
import Get_Products from '../api/Products/get_products.js'
//icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Distributor(){
		//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id

	const toast = useToast();
	//modal states
	const [is_delete_Modalvisible,set_is_delete_Modal_visible]=useState(false);
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const [distributor_data,set_distributor_data] = useState('')
	const [recents,set_recents]=useState(distributor_data?.recents)
	const [products,set_products]=useState([]);
	const [industries,set_industries]=useState([]);

	const cookies = new Cookies();
    let token = cookies.get('admin_token');
    const [auth_role,set_auth_role]=useState("")

	const payload = {
		_id : id,
		email: distributor_data?.email_of_company,
		auth_role
	}
	//useEffects
	//functions

	//api calls
	const get_distributor_data=async(payload)=>{
		await Get_Distributor(payload).then((response)=>{
			//console.log(response)
			set_distributor_data(response?.data)
			const email = response?.data?.email_of_company
			get_products_data(email)
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: `${err}`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	const get_products_data=async(email)=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			//console.log(data)
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email.toLowerCase()))
			set_products(result)

			const industry_values = result.map(item=>item?.industry)
			//console.log([...new Set(industry_values)])
			set_industries([...new Set(industry_values)])
			//console.log(result)
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: `${err.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}

	const handle_subscribe_account=async()=>{
		await Subscribe_Account(payload).then(()=>{
			toast({
				title: '',
				description: `${distributor_data?.company_name} account has been upgraded.`,
				status: 'info',
				isClosable: true,
			});
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: err.response?.data,
				status: 'error',
				isClosable: true,
			});
		})
	}
	const handle_un_subscribe_account=async()=>{
		await Un_Subscribe_Account(payload).then(()=>{
			toast({
				title: '',
				description: `${distributor_data?.company_name} account has been unsubscribed.`,
				status: 'info',
				isClosable: true,
			});
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: err.response?.data,
				status: 'error',
				isClosable: true,
			});
		})
	}

	useEffect(()=>{
		if (!payload || id === undefined){
			toast({
				title: '',
				description: `...broken link,we are redirecting you`,
				status: 'info',
				isClosable: true,
			});
			router.push('/distributors')
		}else{
			get_distributor_data(payload)
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
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<Delete_Account_Modal is_delete_Modalvisible={is_delete_Modalvisible} set_is_delete_Modal_visible={set_is_delete_Modal_visible} distributor_data={distributor_data} acc_type={"distributors"} payload={payload}/>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} distributor_data={distributor_data} acc_type={"distributors"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} distributor_data={distributor_data} acc_type={"distributors"} payload={payload}/>
			<Flex direction='column' p='2'>
				<Flex p='1' direction='column' gap='2'>
					<Flex gap='2' p='2'>
						{distributor_data?.profile_photo_url == '' || !distributor_data?.profile_photo_url? 
							<Flex gap='2' >
								<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
							</Flex>
						: 
							<Flex gap='2' >
								<Image borderRadius='5' boxSize='150px' src={distributor_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
						<Flex direction='column'>
							<Text fontSize='28px' ml='2' fontWeight='bold'>{distributor_data?.company_name}</Text>
							{distributor_data?.subscription? 
								<Text fontWeight='bold' bg='#009393' color='#fff' borderRadius='5' p='2' m='1'>Subscribed</Text>
								: 
								<Text fontWeight='bold' bg='orange' color='#fff' borderRadius='5' p='2' m='1'>Not Subscribed</Text>
							}
							{distributor_data?.suspension_status? 
								<Text fontWeight='bold' color='red' p='1' m='1'>Suspended</Text>
								: null
							}
						</Flex>
					</Flex>
					<Flex direction='column' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
							<Text fontWeight='bold' fontSize='20px'>Company Details</Text>
							<Text>Email: {distributor_data?.email_of_company}</Text>
							<Text>Mobile:{distributor_data?.mobile_of_company}</Text>
							<Text>Address: {distributor_data?.address_of_company}</Text>
					</Flex>
					<Flex direction='column' gap='2' bg='#eee' p='2'>
							<Text fontWeight='bold' fontSize='20px'>Key Contact info</Text>
							<Text>Name: {distributor_data?.contact_person_name}</Text>
							<Text>Mobile: {distributor_data?.contact_mobile}</Text>
							<Text>Email: {distributor_data?.contact_email}</Text>
							<Text>Role: </Text>
					</Flex>
					<Flex direction='column'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Description</Text>
						{distributor_data?.description === ''? 
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not created a bio/description</Text>
							</Flex>
							:
							<Flex mt='2' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
								<Text>{distributor_data?.description}</Text>
							</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Distributor</Text>
						{industries?.length === 0 ?
								<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
									<Text>The User has not seletected an industry to specialize in yet</Text>
								</Flex>
								:
								<Flex direction='column'> 
								{industries?.map((item,index)=>{
									return(
										<Industry key={index} item={item}/>
									)
								})}
							</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
						{distributor_data?.experts?.length === 0 ?
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not added experts to this profile.</Text>
							</Flex>
						:
						<Flex overflowY='scroll' h='40vh' m='1' p='2' borderRadius='5' bg='#eee' gap='3' direction='column' boxShadow='lg'> 
							{distributor_data?.experts?.map((item,index)=>{
								return(
									<Flex key={index} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
										<Flex direction='column'>
											<Text fontWeight='bold'>Name: {item.name}</Text>
											<Text >Email: {item.email}</Text>
											<Text>Mobile: {item.mobile}</Text>
											<Text>Role: {item.role}</Text>
											<Text>Description: {item.description}</Text>
										</Flex>
									</Flex>
								)
							})}
						</Flex>
						}
					</Flex>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Products</Text>
					{products?.length === 0?
						<Flex align='center' justify='center' bg='#eee' h='10vh' p='3'>
							<Text w='50%' textAlign='center'>This Account has not listed any product yet</Text>
						</Flex>
						:
						<Flex direction='column' gap='2'>
							{products?.map((product)=>{
								return(
									<Product_Item product={product} key={product?._id}/>
								)
							})}
						</Flex>
					}
					{distributor_data?.subscription ? 
						<Button bg='#fff' border='1px solid #000' onClick={handle_un_subscribe_account}>Un Subscribe account</Button>
						 : 
						<Button bg='#fff' border='1px solid #000' onClick={handle_subscribe_account}>Subscribe account</Button>
					}
					<Flex gap='2' direction='column'>
						<Button bg='#009393' color='#fff'>
		                    <Link href={`mailto: ${distributor_data?.email_of_company}`} isExternal>Email Distributor</Link>
		                </Button>
						{distributor_data?.suspension_status? 
							<Button bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
							: 
							<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
						}
					</Flex>
					<Button bg='red' color='#fff' onClick={(()=>{set_is_delete_Modal_visible(true)})}>Delete account</Button>				
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Distributor;

const Industry=({item})=>{
	return(
		<Flex flex='1' borderRadius='5' m='1' position='relative'  bg='#eee' p='2'>
			<Text fontSize='20px' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const Product_Item=({product})=>{
	const router = useRouter()
	return(
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#fff' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1' position='relative'>
			{product?.suspension_status? <Flex bg={product?.suspension_status? 'red': '#fff'} zIndex='' h='100%' w='100%' position='absolute' top='0' right='0' opacity='0.3' onClick={(()=>{router.push(`product/${product?._id}`)})}/>: null}
			<Flex direction='column' p='2'>
				<Text fontSize='16px' fontFamily='ClearSans-Bold' color='#009393'>{product.name_of_product}</Text>
				<Text fontSize='14px'>{product.distributed_by}</Text>
				<Flex gap='2' fontSize='10px' color='grey' align='center'>
					<Text color='grey' p='1'>{product.industry? product.industry : '-'}</Text>
					<Text borderLeft='1px solid grey' paddingLeft='2' color='grey' p='1'>{product.technology? product.technology : '-'}</Text>
				</Flex>
			</Flex>
			<Flex direction='column' justify='space-around' p='2' textAlign='center'>
				{product?.sponsored ? 
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' align='center'>
						<Text fontWeight='bold' >Featured</Text>
						<VerifiedIcon style={{color:'gold'}}/>
					</Flex>
					:
					<Text fontWeight='bold' >Not Featured</Text>				
				}
				<Text fontWeight='bold' color='#fff' bg='#009393' p='1' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`product/${product?._id}`)})}>View</Text>
			</Flex>
		</Flex>
	)
}