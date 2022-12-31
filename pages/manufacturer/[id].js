import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image} from '@chakra-ui/react'
import Person2Icon from '@mui/icons-material/Person2';
import FactoryIcon from '@mui/icons-material/Factory';
import Header from '../../components/Header.js';
import Product from '../../components/Product.js';
import {useRouter} from 'next/router';
import SuspendAccountModal from '../../components/modals/suspendAccount.js';
//api calls
import Un_Suspend_AccountModal from '../../components/modals/Un_Suspend_Account.js';
import Get_Manufacturer from '../api/manufacturers/get_manufacturer.js'
import Get_Products from '../api/Products/get_products.js'

function Manufacturer(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);
	const [is_un_suspend_Modal_visible,set_is_un_suspend_Modal_visible]=useState(false);

	const router = useRouter()
	const query = router.query
	const id = query?.id

	const [manufacturer_data,set_manufacturer_data] = useState('')
	const [recents,set_recents]=useState(manufacturer_data?.recents)
	const [products,set_products]=useState([])

	const payload = {
		_id : id
	}
	const get_data=async(payload)=>{
		await Get_Manufacturer(payload).then((response)=>{
			console.log(response)
			return set_manufacturer_data(response.data)
		})
	}
	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response.data
			const result = data?.filter(item => item.email_of_lister.includes(manufacturer_data?.email_of_company))
			set_products(result)
			console.log(result)
		})
	}
	
	// const handle_suspension=async()=>{
	// 	await Suspend_Client(payload).then(()=>{
	// 		alert("account suspended")
	// 	})
	// }
	useEffect(()=>{
		if (!payload || id === undefined){
			alert("missing info could not fetch data")
			router.back()
		}else{
			get_data(payload)
			get_Data()
		}
	},[id])
	return(
		<Flex direction='column' gap='2'>
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} manufacturer_data={manufacturer_data} acc_type={"manufacturers"} payload={payload}/>
			<Un_Suspend_AccountModal is_un_suspend_Modal_visible={is_un_suspend_Modal_visible} set_is_un_suspend_Modal_visible={set_is_un_suspend_Modal_visible} manufacturer_data={manufacturer_data} acc_type={"manufacturers"} payload={payload}/>
			<Header />
			<Flex p='2' direction='column' gap='2'>
				<Flex gap='1'>
					<Text fontWeight='bold' fontSize='32px' textTransform='capitalize' >{manufacturer_data?.first_name} {manufacturer_data?.last_name}</Text>
					{manufacturer_data?.suspension_status? 
						<Text fontSize='16px' opacity='.6' border='1px solid red' w='100px' p='1' m='1'>Suspended</Text>
						: 
						null
					}
				</Flex>
				<Flex direction='column' bg='#eee' p='2'>
						<Text fontWeight='bold' fontSize='20px'>Contacts</Text>
						<Text>Name of company: {manufacturer_data?.company_name}</Text>
						<Text>Email: {manufacturer_data?.email_of_company}</Text>
						<Text>Mobile:{manufacturer_data?.mobile_of_company}</Text>
						<Text>Address: {manufacturer_data?.address_of_company}</Text>
				</Flex>
				<Flex direction='column'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Description</Text>
					{manufacturer_data?.description === ''? 
						<Flex justify='center' align='center' h='15vh'>
							<Text>The User has not created a bio/description</Text>
						</Flex>
						:
						<Flex m='1' h='10vh' p='2' borderRadius='5' bg='#eee'>
							<Text>{manufacturer_data?.description}sdjklel</Text>
						</Flex>
					}
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Industry by this Manufacturer</Text>
					{manufacturer_data?.industries?.length === 0 ?
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not seletected an industry to specialize in yet</Text>
							</Flex>
							:
							<Flex wrap='Wrap'> 
							{manufacturer_data?.industries?.map((item)=>{
								return(
									<Industry key={item._id} item={item}/>
								)
							})}
						</Flex>
						}
				</Flex>
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
					{manufacturer_data?.experts?.length === 0 ?
					<Flex justify='center' align='center' h='15vh'>
						<Text>The User has not added experts to this profile.</Text>
					</Flex>
					:
					<Flex wrap='Wrap' m='1' p='2' borderRadius='5' bg='#eee' gap='3'> 
					{manufacturer_data?.experts?.map((item)=>{
						return(
							<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer' _hover={{boxShadow:"dark-lg",transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#009393",color:"#fff"}}>
								<Person2Icon style={{fontSize:'80px',textAlign:'center'}}/>
								<Flex direction='column'>
									<Text fontWeight='bold'>Email: {item.email}</Text>
									<Text>Mobile: {item.mobile}</Text>
									<Text>Role: {item.role}</Text>
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
					<Flex direction='column' p='1'>
						{products?.map((item)=>{
							return(
								<Product key={item._id} item={item}/>
							)
						})}
					</Flex>
				}
				<Flex direction='column' gap='2' p='2'>
					<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Distributors</Text>
					{manufacturer_data?.distributors?.length === 0 ?
						<Flex justify='center' align='center' h='15vh'>
							<Text>The User has not added distributors to this account</Text>
						</Flex>
						:
						<Flex wrap='Wrap' m='1' p='2' borderRadius='5' bg='#eee' gap='2'> 
						{manufacturer_data?.distributors?.map((item)=>{
							return(
								<Distributor key={item._id} item={item}/>
							)
						})}
					</Flex>
					}
				</Flex>
				<Button bg='#009393' color='#fff'>Contact by Email</Button>
				{manufacturer_data?.suspension_status? 
					<Button bg='#fff' color='green' border='1px solid green' onClick={(()=>{set_is_un_suspend_Modal_visible(true)})}>Un-Suspend Account</Button>
					: 
					<Button bg='#fff' color='red' border='1px solid red' onClick={(()=>{setissuspendModalvisible(true)})}>Suspend Account</Button>
				}
			</Flex>
		</Flex>
	)
}

export default Manufacturer;

const Industry=({item})=>{
	return(
		<Flex w='170px' borderRadius='5' h='225px' m='1' position='relative' bg='#000'>
			<Image borderRadius='10px' objectFit='cover' src={item.img} alt='next'/>
			<Text position='absolute' bottom='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{item.name}</Text>
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

const Distributor=({item})=>{
	const router = useRouter()
	return(
		<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer' _hover={{boxShadow:"dark-lg",transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#009393",color:"#fff"}}>
			<FactoryIcon style={{fontSize:'70px',textAlign:'center'}}/>
			<Flex direction='column' ml='2'>
				<Text fontWeight='bold'>Email: {item.email}</Text>
				<Text>Mobile: {item.mobile}</Text>
			</Flex>
		</Flex>
	)
}