import React,{useState,useEffect} from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import styles from '../../styles/Home.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import Header from '../../components/Header';
import QuotationModal from '../../components/modals/Quotation.js';
import SampleModal from '../../components/modals/Sample.js';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Get_Product from '../api/Products/get_product.js';
import Delete_Product from '../api/Products/delete_product.js';

function Product(){
	const router = useRouter();
	const id = router.query;

	const [isquotationModalvisible,setisquotationModalvisible]=useState(false);
	const [issampleModalvisible,setissampleModalvisible]=useState(false);
	
	const payload = {
		_id : id.id
	}
	const [product_data,set_product_data]=useState('')

	const get_Data=async(payload)=>{
		await Get_Product(payload).then((response)=>{
			set_product_data(response.data)
			console.log(response.data)
		})
	}
	useEffect(()=>{
		if (!payload || payload._id === 'undefined'){
			alert("missing info could not fetch data")
			router.push("/customers")
		}else{
			console.log(payload)
			get_Data(payload)
		}
	},[])
	const handle_Delete_Product=async()=>{
		await Delete_Product(payload).then(()=>{
			router.back()
			alert("successfuly deleted")
		})
	}
	return(
		<Flex direction='column'>
			<Header />
			<QuotationModal isquotationModalvisible={isquotationModalvisible} setisquotationModalvisible={setisquotationModalvisible}/>
			<SampleModal issampleModalvisible={issampleModalvisible} setissampleModalvisible={setissampleModalvisible}/>
			<Flex className={styles.productbody}>
			<Flex p='2' direction='column' gap='2' className={styles.productsection1} position='relative'>
				<Flex position='absolute' top='1' right='1' p='1' bg='#009393' borderRadius='5' color='#fff'>
					<DoneAllOutlinedIcon />
					<Text>{product_data?.sponsored}</Text>
				</Flex>
				<Text fontFamily='ClearSans-Bold' fontSize='32px'>{product_data?.name_of_product}</Text>
				<Flex>
					<Text>Manufactured by:</Text>
					<Text color='grey'>{product_data?.manufactured_by}</Text>
				</Flex>
				<Flex>
					<Text>Manufactured date:</Text>
					<Text color='grey'>{product_data?.manufactured_date}</Text>
				</Flex>
				<Flex>
					<Text>Expiry by:</Text>
					<Text color='grey'>{product_data?.manufactured_date}</Text>
				</Flex>
				<Flex>
					<Text>Distributed by:</Text>
					<Text color='grey'>{product_data?.distributed_by}</Text>
				</Flex>
				<Flex direction='column'>
					<Text color='#000' fontWeight='bold'>Description</Text>
					<Text>{product_data?.description}</Text>
					<Text mt='4'>{product_data?.chemical_name}</Text>
				</Flex>
				<Flex direction='column' gap='2' mt='2'>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Product Data Sheet</Button>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Safety Data Sheet</Button>
					<Button bg='grey' borderRadius='0' color='#fff'><FileDownloadIcon />Formulation Document</Button>
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
			</Flex>
			<Flex p='2' gap='2' className={styles.productsection2} direction='column'>
				<Button color='#fff' borderRadius='0' bg='#009393' onClick={(()=>{setisquotationModalvisible(true)})}><DescriptionIcon />Request Quotation</Button>
				<Button color='#fff' borderRadius='0' bg='#000' onClick={(()=>{setissampleModalvisible(true)})}><DescriptionIcon />Request Sample</Button>
				<Text textAlign='center'>or</Text>
				<Button bg='#eee' borderRadius='0' border='1px solid #000' p='1' onClick={(()=>{router.push(`/product/edit_config/${payload._id}`)})}>Edit Product</Button>
				<Button bg='#eee' borderRadius='0' border='1px solid #000' p='1'>List as short Expiry</Button>
				<Button bg='#eee' color='red' borderRadius='0' border='1px solid red' p='1' onClick={handle_Delete_Product}>Delete Product</Button>
			</Flex>
			</Flex>
		</Flex>
	)
}

export default Product;