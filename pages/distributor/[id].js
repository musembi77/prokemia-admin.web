import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Button,Image,useToast,Link} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../../components/Header.js'
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
import Product from '../../components/Product.js';
//api calls
import Get_Distributor from '../api/distributors/get_distributor.js'
import Get_Products from '../api/Products/get_products.js'
//icons
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';

function Distributor(){
		//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id

	const payload = {
		_id : id
	}

	const toast = useToast();
	//states
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const [distributor_data,set_distributor_data] = useState('')
	const [recents,set_recents]=useState(distributor_data?.recents)
	const [products,set_products]=useState([])
	//useEffects
	//functions
	//api calls
	const get_distributor_data=async(payload)=>{
		await Get_Distributor(payload).then((response)=>{
			console.log(response)
			set_distributor_data(response?.data)
			const email = response?.data?.email_of_company
			get_products_data(email)
		}).catch((err)=>{
			//console.log(err)
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
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email))
			set_products(result)
			console.log(result)
		}).catch((err)=>{
			//console.log(err)
			toast({
				title: '',
				description: `${err.data}`,
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
			router.push('/manufacturers')
		}else{
			get_distributor_data(payload)
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<Header />
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
							<Text>Name: {distributor_data?.first_name} {distributor_data?.last_name}</Text>
							<Text>Email: {distributor_data?.email_of_company}</Text>
							<Text>Mobile:{distributor_data?.mobile_of_company}</Text>
							<Text>Address: {distributor_data?.address_of_company}</Text>
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
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Manufacturer</Text>
						{distributor_data?.industries?.length === 0 ?
								<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
									<Text>The User has not seletected an industry to specialize in yet</Text>
								</Flex>
								:
								<Flex wrap='Wrap'> 
								{distributor_data?.industries?.map((item)=>{
									return(
										<Industry key={item._id} item={item}/>
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
							{distributor_data?.experts?.map((item)=>{
								return(
									<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
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
						<Flex wrap='Wrap' gap='2'>
							{products?.map((item)=>{
								return(
									<Product key={item?._id} item={item}/>
								)
							})}
						</Flex>
					}
					<Flex p='2' gap='2'>
						<Button flex='1' bg='#009393' color='#fff'>
		                    <Link href={`mailto: ${distributor_data?.email_of_company}`} isExternal>Email Distributor</Link>
		                </Button>
						{distributor_data?.suspension_status? 
							<Button flex='1' bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
							: 
							<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
						}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Distributor;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' >
			<Image borderRadius='10px' objectFit='cover' src={item?.img} alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item?.name}</Text>
		</Flex>
	)
}

const industries=[
	{
				id:'1',
				name:"Adhesives",
				img:"../images.jpeg",
			},
			{
				id:'2',
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				id:'3',
				name:"Food and Nutrition",
				img:"../download (1).jpeg",
			},
			{
				id:'4',
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
]