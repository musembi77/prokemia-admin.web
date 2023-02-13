import React,{useState,useEffect}from 'react';
//module imports
import {Flex,Text,Button,Image,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router'
import Person2Icon from '@mui/icons-material/Person2';
//components imports
import Header from '../../../components/Header.js'
import SuspendAccountModal from '../../../components/modals/suspendAccount.js';
import Product from '../../../components/Product.js';
//api calls
import Get_Distributor from '../../api/distributors/get_distributor.js'
import Approve_Distributor from '../../api/distributors/approve_distributor.js'
import Get_Products from '../../api/Products/get_products.js'
import VerifiedIcon from '@mui/icons-material/Verified';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Distributor(){
	const [issuspendModalvisible,setissuspendModalvisible]=useState(false);

	const router = useRouter();
	const toast = useToast()
	const query = router.query
	const id = query?.id

	const [distributor_data,set_distributor_data] = useState('')
	const [recents,set_recents]=useState(distributor_data?.recents)
	const [products,set_products]=useState([])

	const payload = {
		_id : id
	}
	const get_data=async(payload)=>{
		await Get_Distributor(payload).then((response)=>{
			console.log(response)
			return set_distributor_data(response?.data)
		})
	}
	const get_Data=async()=>{
		await Get_Products().then((response)=>{
			const data = response?.data
			console.log(data)
			const result = data?.filter(item => item?.email_of_lister.includes(distributor_data?.email_of_company))
			set_products(result)
			console.log(result)
		})
	}
		
	useEffect(()=>{
		if (!payload || id === undefined){
			alert("missing info could not fetch data")
			router.back()
		}else{
			get_data(payload)
			get_Data()
		}
	},[id])

	const handle_approve_distributor=async()=>{
		await Approve_Distributor(payload).then(()=>{
			toast({
              title: '',
              description: `${distributor_data.company_name} has been approved`,
              status: 'info',
              isClosable: true,
            });
			router.back()
		}).catch((err)=>{
			toast({
              title: '',
              description: err.response?.data,
              status: 'error',
              isClosable: true,
            });
		})
	}
	return(
		<Flex direction='column' gap='2'>
			<Header />
			<SuspendAccountModal issuspendModalvisible={issuspendModalvisible} setissuspendModalvisible={setissuspendModalvisible} distributor_data={distributor_data} acc_type={"distributors"} payload={payload}/>
			<Flex direction='column' p='2'>
				<Flex gap='1'>
					<Text fontWeight='bold' fontSize='24px' textTransform='capitalize' >{distributor_data?.company_name}</Text>
					{distributor_data?.suspension_status? 
						<Text fontSize='16px' opacity='.6' border='1px solid red' w='100px' p='1' m='1'>Suspended</Text>
						: 
						null
					}
				</Flex>
				<Flex p='1' direction='column' gap='2'>
				<Flex direction='column' bg='#eee' p='2'>
						<Text fontWeight='bold' fontSize='20px'>Contacts</Text>
						<Text>Name of company: {distributor_data?.company_name}</Text>
						<Text>Email: {distributor_data?.email_of_company}</Text>
						<Text>Mobile:{distributor_data?.mobile_of_company}</Text>
						<Text>Address: {distributor_data?.address_of_company}</Text>
				</Flex>
					<Flex direction='column' gap='2' bg='#eee' p='2'>
							<Text fontWeight='bold' fontSize='20px'>Coorporate details</Text>
							<Text>Name: {distributor_data?.contact_person_name}</Text>
							<Text>Mobile: {distributor_data?.contact_mobile}</Text>
							<Text>Email: {distributor_data?.contact_email}</Text>
					</Flex>
					<Flex direction='column'>
						<Text fontSize='20px' fontWeight='bold' >Description</Text>
						{distributor_data?.description === ''? 
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not created a bio/description</Text>
							</Flex>
							:
							<Flex m='1' h='10vh' p='2' borderRadius='5' bg='#eee'>
								<Text>{distributor_data?.description}</Text>
							</Flex>
						}
					</Flex>
					<Flex direction='column' gap='2'>
						<Text fontSize='20px' fontWeight='bold' >Industry by this Manufacturer</Text>
							<Flex bg='#eee' borderRadius='5' justify='center' align='center' h='15vh'>
								<Text>The User has not seletected an industry to specialize in yet</Text>
							</Flex>
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
									<Flex key={item?._id} bg='#eee' borderRadius='5px' boxShadow='lg' justify='space-between' flex='1'>
										<Flex direction='column' position='relative' p='2'>
											{item?.sponsored ? 
												<Flex bg='#fff' p='1' borderRadius='5' cursor='pointer' boxShadow='lg' align='center'>
													<Text fontWeight='bold' >Featured</Text>
													<VerifiedIcon style={{color:'gold'}}/>
												</Flex>
												:
												<Text fontWeight='bold' >Not Featured</Text>				
											}
											<Text color='#009393' fontWeight='bold' fontSize="24px">{item?.name_of_product}</Text>
											<Flex gap='2'>
												<Text fontWeight='bold'>Industry:</Text>
												<Text>{item?.industry}</Text>
											</Flex>
											<Flex gap='2'>
												<Text fontWeight='bold'>Technology:</Text>
												<Text>{item?.technology}</Text>
											</Flex>
										</Flex>
										<Text w='60px' fontWeight='bold' bg='#fff' p='2' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/product/${item?._id}`)})}>View product</Text>
									</Flex>
								)
							})}
						</Flex>
					}
					<Flex direction='column' gap='2' p='2'>
						<Text fontSize='20px' fontWeight='bold' borderBottom='1px solid #000'>Experts</Text>
						{distributor_data?.experts?.length === 0 ?
							<Flex justify='center' align='center' h='15vh'>
								<Text>The User has not added experts to this profile.</Text>
							</Flex>
							:
							<Flex wrap='Wrap' gap='2'> 
							{distributor_data?.experts?.map((item)=>{
								return(
									<Flex key={item._id} direction='' bg='#fff' p='2' borderRadius='5' boxShadow='lg' cursor='pointer'>
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
					<Flex p='2' gap='2' direction='column'>
						<Button color='#fff' borderRadius='0' bg='#009393' onClick={handle_approve_distributor}>Approve Distributor</Button>
						<Button bg='#fff' color='red' borderRadius='0' border='1px solid red' p='1' onClick={(()=>{setissuspendproductModalvisible(true)})}>Decline Distributor</Button>
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