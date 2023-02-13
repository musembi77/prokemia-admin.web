//modules
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image,Link,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router';
//components
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
import Header from '../../components/Header.js';
import Product from '../../components/Product.js';
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import FactoryIcon from '@mui/icons-material/Factory';
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
//api calls
import Get_Manufacturer from '../api/manufacturers/get_manufacturer.js'
import Get_Products from '../api/Products/get_products.js'
import Subscribe_Account from '../api/manufacturers/subscribe_account.js'

export default function Manufacturer(){
	//utils
	const router = useRouter()
	const query = router.query
	const id = query?.id



	const toast = useToast();
	//states
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const [manufacturer_data,set_manufacturer_data] = useState('')
	const [recents,set_recents]=useState(manufacturer_data?.recents)
	const [products,set_products]=useState([]);
	const [industries,set_industries]=useState([])

	const payload = {
		_id : id,
		email: manufacturer_data?.email_of_company
	}
	//useEffects
	//functions
	//api calls
	const get_manufacturer_data=async(payload)=>{
		await Get_Manufacturer(payload).then((response)=>{
			//console.log(response)
			set_manufacturer_data(response?.data)
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
			const result = data?.filter((item)=> item?.email_of_lister.toLowerCase().includes(email))
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
				description: `${manufacturer_data?.company_name} account has been upgraded.`,
				status: 'info',
				isClosable: true,
			});
		}).catch((err)=>{
			////console.log(err)
			toast({
				title: '',
				description: `could not upgrade account,`,
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
			get_manufacturer_data(payload)
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} manufacturer_data={manufacturer_data} acc_type={"manufacturers"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} manufacturer_data={manufacturer_data} acc_type={"manufacturers"} payload={payload}/>
			<Header />
			<Flex p='2' direction='column' gap='2'>
				<Flex gap='2' p='2'>
					{manufacturer_data?.profile_photo_url == '' || !manufacturer_data?.profile_photo_url? 
						<Flex gap='2' >
							<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
						</Flex>
					: 
						<Flex gap='2' >
							<Image borderRadius='5' boxSize='150px' src={manufacturer_data?.profile_photo_url} alt='profile photo' boxShadow='lg' objectFit='cover'/>
						</Flex>
					}
					<Flex direction='column'>
						<Text fontWeight='bold' fontSize='32px' textTransform='capitalize' >{manufacturer_data?.company_name}</Text>
						{manufacturer_data?.subscription? 
								<Text fontWeight='bold' bg='#009393' color='#fff' borderRadius='5' p='2' m='1'>Subscribed</Text>
								: 
								<Text fontWeight='bold' bg='orange' color='#fff' borderRadius='5' p='2' m='1'>Not Subscribed</Text>
							}
						{manufacturer_data?.suspension_status? 
							<Text fontWeight='bold' color='red' p='1' m='1'>Suspended</Text>
							: null
						}
					</Flex>
				</Flex>
				<Flex direction='column' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
						<Text>Name: {manufacturer_data?.first_name} {manufacturer_data?.last_name}</Text>
						<Text>Email: {manufacturer_data?.email_of_company}</Text>
						<Text>Mobile:{manufacturer_data?.mobile_of_company}</Text>
						<Text>Address: {manufacturer_data?.address_of_company}</Text>
				</Flex>
				<Flex direction='column' gap='2' bg='#eee' p='2'>
							<Text fontWeight='bold' fontSize='20px'>Coorporate details</Text>
							<Text>Name: {manufacturer_data?.contact_person_name}</Text>
							<Text>Mobile: {manufacturer_data?.contact_mobile}</Text>
							<Text>Email: {manufacturer_data?.contact_email}</Text>
					</Flex>
				<Flex direction='column'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Description</Text>
					{manufacturer_data?.description === ''? 
						<Flex justify='center' align='center' h='15vh'>
							<Text>The User has not created a bio/description</Text>
						</Flex>
						:
						<Flex mt='2' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
							<Text>{manufacturer_data?.description}</Text>
						</Flex>
					}
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Manufacturer</Text>
					{industries?.length === 0 ?
							<Flex justify='center' align='center' h='15vh' bg='#eee' p='2' borderRadius='5' boxShadow='lg' gap='2'>
								<Text>The User has not seletected an industry to specialize in yet</Text>
							</Flex>
							:
							<Flex direction='column'> 
							{industries?.map((item)=>{
								return(
									<Industry key={item._id} item={item}/>
								)
							})}
						</Flex>
						}
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
					{manufacturer_data?.experts?.length === 0 ?
						<Flex justify='center' align='center' h='15vh'>
							<Text>The User has not added experts to this profile.</Text>
						</Flex>
					:
					<Flex m='1' p='2' borderRadius='5' bg='#eee' gap='3' direction='column' boxShadow='lg'> 
						{manufacturer_data?.experts?.map((item)=>{
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
				<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Products listed by this user</Text>
				{products?.length === 0?
					<Flex align='center' justify='center' bg='#eee' h='10vh' p='3'>
						<Text w='50%' textAlign='center'>This Account has not listed any product yet</Text>
					</Flex>
					:
					<Flex direction='column' gap='2'>
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
						</Flex>
				}
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Distributors</Text>
					{manufacturer_data?.distributors?.length === 0 ?
						<Flex justify='center' align='center' h='15vh'>
							<Text>The User has not added distributors to this account</Text>
						</Flex>
						:
						<Flex m='1' p='2' borderRadius='5' bg='#eee' gap='2' direction='column'> 
						{manufacturer_data?.distributors?.map((item)=>{
							return(
								<Distributor key={item._id} item={item}/>
							)
						})}
					</Flex>
					}
				</Flex>
				<Button bg='#fff' border='1px solid #000' onClick={handle_subscribe_account}>Upgrade Account</Button>
				<Flex p='2' gap='2'>
					<Button flex='1' bg='#009393' color='#fff'>
	                    <Link href={`mailto: ${manufacturer_data?.email_of_company}`} isExternal>Email Manufacturer</Link>
	                </Button>
					{manufacturer_data?.suspension_status? 
						<Button flex='1' bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
						: 
						<Button flex='1' bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
					}
				</Flex>
				
			</Flex>
		</Flex>
	)
}

const Industry=({item})=>{
	return(
		<Flex flex='1' borderRadius='5' m='1' position='relative'  bg='#eee' p='2'>
			<Text fontSize='20px' fontFamily='ClearSans-Bold'>{item}</Text>
		</Flex>
	)
}

const Distributor=({item})=>{
	const router = useRouter()
	return(
		<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
			<FactoryIcon style={{fontSize:'70px',textAlign:'center'}}/>
			<Flex direction='column' ml='2'>
				<Text fontWeight='bold'>Name: {item.name}</Text>
				<Text>Email: {item.email}</Text>
				<Text>Mobile: {item.mobile}</Text>
				<Text>Industry: {item.industry}</Text>
			</Flex>
		</Flex>
	)
}

const Product_Item=({product})=>{
	const router = useRouter()
	return(
		<Flex borderRight={product?.sponsored === true ?'4px solid gold': null} bg='#fff' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
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
			<Flex direction='column' justify='space-around' p='2' textAlign='center'>
				{product?.sponsored ? 
					<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' align='center'>
						<Text fontWeight='bold' >Featured</Text>
						<VerifiedIcon style={{color:'gold'}}/>
					</Flex>
					:
					<Text fontWeight='bold' >Not Featured</Text>				
				}
				<Text fontWeight='bold' color='#fff' bg='#009393' p='1' borderRadius='5' boxShadow='lg' cursor='pointer' onClick={(()=>{router.push(`/product/${product?._id}`)})}>View</Text>
			</Flex>
		</Flex>
	)
}