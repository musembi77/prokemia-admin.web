//modules imports
import React,{useState,useEffect,useRef} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,useToast,Link} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//api calls 
import Edit_Product from '../../api/Products/edit_product.js';
//icons imports
import DoneIcon from '@mui/icons-material/Done';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
//utils 
import Cookies from 'universal-cookie';
import {storage} from '../../../components/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

export default function EditFile({product_data,payload,set_iseditfiles}){
	//utils
	const toast = useToast();
	const [is_submitting,set_is_submitting]=useState(false);
	const [is_retry,set_is_retry]=useState(false);
	const [is_upload_file,set_is_uplaod_file]=useState(false)

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

	const edit_payload = {
		_id: product_data?._id,
		data_sheet_url,
		safety_data_sheet_url,
		formulation_document_url,
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
			Edit_Product_Function()
		})
	}

	const Edit_Product_Function=async()=>{
		console.log(edit_payload)
		if ((edit_payload.data_sheet_url == '') || (edit_payload.safety_data_sheet_url == '') || (edit_payload.formulation_document_url == '')){
			set_data_sheet_url(cookies.get("data_sheet_url"))
			set_safety_data_sheet_url(cookies.get("safety_data_sheet_url"))
			set_formulation_document_url(cookies.get("formulation_document_url"))
			set_is_retry(true)
		}else{
			await Edit_Product(edit_payload).then(()=>{
				alert(`Files have been uploaded to ${product_data?.name_of_product}`)
				router.back()
				// set_isloading(false)
			}).catch((err)=>{
				alert('could not create a new product')
			    // set_isloading(false)
			    router.back()
			})
		}
	}
	console.log(edit_payload)
	return(
			<>
				{is_upload_file?
					<Flex direction='column' boxShadow='lg' p='1' gap='2' m='2'>
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
								<Button flex='1' bg='#000' onClick={Edit_Product_Function}>Complete</Button>
								:
								<Button flex='1' bg='#000' onClick={handle_File_Upload} disabled={is_submitting?true:false}>Upload files</Button>	
							}
							<Button flex='1' bg='#009393' disabled={is_submitting?true:false}>Cancel <ArrowRightAltIcon/></Button>
						</Flex>
					</Flex>
				:
					<Existing_files product_data={product_data} set_iseditfiles={set_iseditfiles} set_is_uplaod_file={set_is_uplaod_file}/>
				}
			</>
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

const Existing_files=({product_data,set_iseditfiles,set_is_uplaod_file})=>{
	return(
		<Flex direction='column'  p='1' gap='2' m='2'>
			<Text color='#009393' fontSize='24px' fontWeight='bold'>Documents</Text>
			{product_data?.data_sheet === ''? 
				<Flex h='10vh' justify='center' align='center' bg='#eee' borderRadius='5'>
					<Text>No data sheet file has been uploaded</Text>
				</Flex>
			:
				<Flex justify='space-between' boxShadow='lg' p='2' align='center' borderRadius='5'> 
					<InsertDriveFileIcon/>
					<Text>Data sheet document</Text>
					<Link href={product_data?.data_sheet} border='1px solid grey' p='2' borderRadius='5'>View</Link>
				</Flex>
			}
			{product_data?.safety_data_sheet === ''? 
				<Flex h='10vh' justify='center' align='center' bg='#eee' borderRadius='5'>
					<Text>No safety data sheet file has been uploaded</Text>
				</Flex>
			:
				<Flex justify='space-between' boxShadow='lg' p='2' align='center' borderRadius='5'> 
					<InsertDriveFileIcon/>
					<Text>Safety_data_sheet document</Text>
					<Link href={product_data?.safety_data_sheet} border='1px solid grey' p='2' borderRadius='5'>View</Link>
				</Flex>
			}
			{product_data?.formulation_document === ''? 
				<Flex h='10vh' justify='center' align='center' bg='#eee' borderRadius='5'>
					<Text>No formulation document file has been uploaded</Text>
				</Flex>
			:
				<Flex justify='space-between' boxShadow='lg' p='2' align='center' borderRadius='5'> 
					<InsertDriveFileIcon/>
					<Text>Formulation document</Text>
					<Link href={product_data?.formulation_document} border='1px solid grey' p='2' borderRadius='5'>View</Link>
				</Flex>
			}
			<Flex gap='2'>
				<Button bg='#009393' color='#fff' flex='1' onClick={(()=>{set_is_uplaod_file(true)})}>Edit/Add Files</Button>
				<Button bg='#fff' border='1px solid red' flex='1' onClick={(()=>{set_iseditfiles(false)})}>Go back</Button>
			</Flex>
		</Flex>
	)
}