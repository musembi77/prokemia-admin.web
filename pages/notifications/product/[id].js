import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Link,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import styles from '../../../styles/Home.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import Header from '../../../components/Header';
import SuspendProductModal from '../../../components/modals/suspendProduct.js';
import Decline_Product from '../../../components/modals/Product_Modals/Decline_Product.js';
import Get_Product from '../../api/Products/get_product.js';
import Approve_Product from '../../api/Products/approve_product.js';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Product(){
	const router = useRouter();
	const toast = useToast();
	const id = router.query;
	const cookies = new Cookies();
    let token = cookies.get('admin_token');
    const [auth_role,set_auth_role]=useState("")

	const [issuspendproductModalvisible,setissuspendproductModalvisible]=useState(false);
	const [isdeleteproductModalvisible,setisdeleteproductModalvisible]=useState(false);


	const [product_data,set_product_data]=useState('')

	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			//console.log(response.data)
		})
	}
	useEffect(()=>{
		if (!payload || payload._id === undefined){
			toast({
              title: '',
              description:`missing info could not fetch data`,
              status: 'info',
              isClosable: true,
            });
			router.back()
		}else{
			//console.log(payload)
			get_Data(payload)
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
	        //////console.log(decoded);
	        set_auth_role(decoded?.role)
	      }
	},[])

	const payload = {
		_id : id.id,
		auth_role,
		name_of_product:product_data?.name_of_product
	}
	console.log(payload)

	const handle_approve_product=async()=>{
		await Approve_Product(payload).then(()=>{
			toast({
              title: '',
              description:`${product_data.name_of_product} has been approved`,
              status: 'success',
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
	let manufactured_date = new Date(product_data?.manufactured_date).toLocaleDateString()
	return(
		<Flex direction='column'>
		<SuspendProductModal issuspendproductModalvisible={issuspendproductModalvisible} setissuspendproductModalvisible={setissuspendproductModalvisible}/>
		<Decline_Product isdeleteproductModalvisible={isdeleteproductModalvisible} setisdeleteproductModalvisible={setisdeleteproductModalvisible} id={id} payload={payload}/>
		<Header />
		<Flex className={styles.productbody} >
			<Flex p='2' direction='column' gap='2' className={styles.productsection1} position='relative'>
				<Text fontFamily='ClearSans-Bold' fontSize='32px'>{product_data?.name_of_product}</Text>
				<Flex>
					<Text>Manufactured by:</Text>
					<Text color='grey'>{product_data?.manufactured_by}</Text>
				</Flex>
				<Flex>
					<Text>Contact of lister:</Text>
					<Text color='grey'>{product_data?.email_of_lister}</Text>
				</Flex>
				<Flex>
					<Text>Distributed by:</Text>
					<Text color='grey'>{product_data?.distributed_by}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text color='#000' fontWeight='bold'>Description</Text>
					<Text>{product_data?.description_of_product}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Brand</Text>
					<Text>{product_data?.brand}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Chemical_name</Text>
					<Text>{product_data?.chemical_name}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Function</Text>
					<Text>{product_data?.function}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Industry</Text>
					<Text>{product_data?.industry}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Technology</Text>
					<Text>{product_data?.technology}</Text>
				</Flex>
								<Flex direction='column' gap='2' mt='2'>
					<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Product Data Sheet</Link>
					<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Safety Data Sheet</Link>
					<Link href={product_data?.data_sheet} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Formulation Document</Link>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Features & Benefits</Text>
					<Text>{product_data?.features_of_product}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Applications and benefits</Text>
					<Text>{product_data?.application_of_product}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Packaging</Text>
					<Text>{product_data?.packaging_of_product}</Text>
				</Flex>
				<Flex direction='column' bg='#e5e5e5' borderRadius='1' p='1'>
					<Text fontWeight='bold'>Storage & Handling</Text>
					<Text>{product_data?.storage_of_product}</Text>
				</Flex>
				<Link href={product_data?.website_link_to_Seller} bg='grey' borderRadius='5' boxShadow='lg' color='#fff' align='center' p='1' isExternal fontSize='20px'>Website link</Link>
			</Flex>
			<Flex p='2' gap='2' className={styles.productsection2} direction='column'>
				<Button color='#fff' borderRadius='0' bg='#009393' onClick={handle_approve_product}>Approve Product</Button>
				<Button bg='#eee' borderRadius='0' border='1px solid #000' p='1' onClick={(()=>{router.push(`/product/edit_config/${payload._id}`)})}>Edit Product</Button>
				<Button bg='#fff' color='red' borderRadius='0' border='1px solid red' p='1' onClick={(()=>{setisdeleteproductModalvisible(true)})}>Delete Product</Button>
			</Flex>
			</Flex>
		</Flex>
	)
}

export default Product;