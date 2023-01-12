//modules imports
import React,{useState,useEffect,useRef} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//api calls 
import Add_New_Product from '../api/Products/add_new_product.js'
//icons imports
import DoneIcon from '@mui/icons-material/Done';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
//utils 
import Cookies from 'universal-cookie';
import {storage} from '../../components/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

export default function UploadFile({prod_payload,handle_add_new_product,set_isloading}){
	//utils
	const toast = useToast();
	const [is_submitting,set_is_submitting]=useState(false);
	const [is_retry,set_is_retry]=useState(false);

	const router = useRouter();
	const cookies = new Cookies();
	//states
	const [data_sheet,set_data_sheet]=useState('');
	const [data_sheet_url,set_data_sheet_url]=useState('');
	//const  data_sheet_url= useRef();
	const [data_sheet_uploaded,set_data_sheet_uploaded]=useState(false);

	const [safety_data_sheet,set_safety_data_sheet]=useState("");
	const [safety_data_sheet_url,set_safety_data_sheet_url]=useState('');
	//const safety_data_sheet_url = useRef()
	const [safety_data_sheet_uploaded,set_safety_data_sheet_uploaded]=useState(false);

	const [formulation_document,set_formulation_document]=useState("");
	const [formulation_document_url,set_formulation_document_url]=useState('');
	//const formulation_document_url = useRef();
	const [formulation_document_uploaded,set_formulation_document_uploaded]=useState(false);

	const payload = {
		name_of_product:prod_payload.name_of_product,
		email_of_lister: prod_payload.email_of_lister,
		listed_by_id : 'admin',
		short_on_expiry : prod_payload.short_on_expiry,
		manufactured_by:prod_payload.manufactured_by,
		distributed_by :prod_payload.distributed_by,
		description_of_product: prod_payload.description_of_product,
		chemical_name :prod_payload.chemical_name,
		function : prod_payload.function,
		brand : prod_payload.brand,
		features_of_product : prod_payload.features_of_product,
		application_of_product: prod_payload.application_of_product,
		packaging_of_product : prod_payload.packaging_of_product,
		storage_of_product: prod_payload.storage_of_product,

		data_sheet_url,
		safety_data_sheet_url,
		formulation_document_url,

		industry: prod_payload.industry,
		technology: prod_payload.technology,
		website_link: prod_payload.website_link
	}

	const handle_data_sheet_file_upload=async()=>{
		if (data_sheet.name == undefined){
			return alert('could not process file, try again.')
		}else{
			console.log(data_sheet.name)
			const data_sheet_documentRef = ref(storage, `data_sheet/${data_sheet?.name + v4()}`);
			const snapshot= await uploadBytes(data_sheet_documentRef,data_sheet)
			set_data_sheet_uploaded(true)
			const file_url = await getDownloadURL(snapshot.ref)
			cookies.set('data_sheet_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_safety_sheet_file_upload=async()=>{
		if (safety_data_sheet.name == undefined){
			return alert('could not process file, try re-uploading again.')  
		}else{
			console.log(safety_data_sheet.name)
			const safety_data_sheet_documentRef = ref(storage, `safety_data_sheet/${safety_data_sheet?.name + v4()}`);
			const snapshot= await uploadBytes(safety_data_sheet_documentRef,safety_data_sheet)
			const file_url = await getDownloadURL(snapshot.ref)
			set_safety_data_sheet_uploaded(true)
			cookies.set('safety_data_sheet_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_formulation_document_file_upload=async()=>{
		if (formulation_document.name == undefined){
			return alert('could not process file, try re-uploading again.')
		}else{
			console.log(formulation_document.name)
			const formulation_document_documentRef = ref(storage, `formulation_document/${formulation_document?.name + v4()}`);
			const snapshot= await uploadBytes(formulation_document_documentRef,formulation_document)
			const file_url = await getDownloadURL(snapshot.ref)
			set_formulation_document_uploaded(true)
			cookies.set('formulation_document_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_File_Upload=async()=>{
		set_is_submitting(true)
		await handle_data_sheet_file_upload().then((res)=>{
			console.log(res)
			set_data_sheet_url(res)
			 //data_sheet_url.current = res
		})
		await handle_safety_sheet_file_upload().then((res)=>{
			console.log(res)
			set_safety_data_sheet_url(res)
			//safety_data_sheet_url.current = res
		})
		await handle_formulation_document_file_upload().then((res)=>{
			console.log(res)
			set_formulation_document_url(res)
			//formulation_document_url.current = res
		}).then(()=>{
			Add_Product_Function()
		})
	}
	const Add_Product_Function=async()=>{
		console.log(payload)
		if ((payload.data_sheet_url == '') || (payload.safety_data_sheet_url == '') || (payload.formulation_document_url == '')){
			set_data_sheet_url(cookies.get("data_sheet_url"))
			set_safety_data_sheet_url(cookies.get("safety_data_sheet_url"))
			set_formulation_document_url(cookies.get("formulation_document_url"))
			set_is_retry(true)
		}else{
			await Add_New_Product(payload).then(()=>{
				alert(`${payload.name_of_product} has been created`)
				router.push('/inventory')
				set_isloading(false)
			}).catch((err)=>{
				alert('could not create a new product')
			    set_isloading(false)
			    router.push('/inventory')
			})
		}
	}
	console.log(payload)
	return(
		<Flex direction='column' w='90vw' boxShadow='lg' p='1' gap='2'>
			<Text color='#009393' fontSize='24px' fontWeight='bold'>Upload Documents</Text>
			{data_sheet_uploaded?
				<Uploaded name={data_sheet.name}/>
				:
				<Flex direction='column'>
					<Text>Data Sheet</Text>
					<Input type='file' placeholder='product data sheet' variant='filled' onChange={((e)=>{set_data_sheet(e.target.files[0])})}/>
				</Flex>
			}
			{safety_data_sheet_uploaded?
				<Uploaded name={safety_data_sheet.name}/>
				:
				<Flex direction='column'>
					<Text>Formulation Document</Text>
					<Input type='file' placeholder='Formulation Dcument' variant='filled' onChange={((e)=>{set_formulation_document(e.target.files[0])})}/>
				</Flex>
			}
			{formulation_document_uploaded?
				<Uploaded name={formulation_document.name}/>
				:
				<Flex direction='column'>
					<Text>Safety Data Sheet</Text>
					<Input type='file' placeholder='product safety_data_sheet sheet' variant='filled' onChange={((e)=>{set_safety_data_sheet(e.target.files[0])})}/>
				</Flex>
			}
			<Flex m='2' gap='2' color='#fff'>
				{is_retry?
					<Button flex='1' bg='#000' onClick={Add_Product_Function}>Complete</Button>
					:
					<Button flex='1' bg='#000' onClick={handle_File_Upload} disabled={is_submitting?true:false}>Upload files</Button>	
				}
				<Button flex='1' bg='#009393' onClick={handle_add_new_product} disabled={is_submitting?true:false}>Skip for now <ArrowRightAltIcon/></Button>
			</Flex>
		</Flex>
	)
}

const Uploaded=({name})=>{
	return(
		<Flex boxShadow='lg' borderRadius='5' p='2' borderRight='2px solid green'>
			<Text w='100%' >{name} uploaded</Text>
			<DoneIcon style={{color:"green"}}/>
		</Flex>
	)
}