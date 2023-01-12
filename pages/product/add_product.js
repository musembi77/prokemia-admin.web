//modules imports
import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox,useToast} from '@chakra-ui/react'
import {useRouter} from 'next/router'
//api calls 
import Add_New_Product from '../api/Products/add_new_product.js'
import Get_Technologies from '../api/controls/get_technologies'
import Get_Industries from '../api/controls/get_industries';
//components imports
import Loading from '../../components/Loading.js'
import Header from '../../components/Header';
import UploadFile from './upload_files.js'
//styles
import styles from '../../styles/Home.module.css';
 
export default function Add_Product(){
//modules
	const toast = useToast();
	const router = useRouter();
	//useEffects
	useEffect(()=>{
		get_Industries_Data()
		get_Technology_Data()
	},[])
//apis
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_industries_data(result)
		})
	}
	const get_Technology_Data=async()=>{
		await Get_Technologies().then((response)=>{
			//console.log(response.data)
			const data = response.data
			const result = data.filter(v => v.verification_status)
			//console.log(data.filter(v => v.verification_status))
			set_technologies_data(result)
		})
	}
	//utils
//usestates:

	//data
	const [industries_data, set_industries_data]=useState([]);
	const [technologies_data, set_technologies_data]=useState([]);

	//states
	const [isloading,set_isloading]=useState(false)
	const [isfileupload,set_isfileupload]=useState(false)

	//payload 
		const [name_of_product,set_name_of_product]=useState("");
		const [email_of_lister,set_email_of_lister]=useState("");
		const [listed_by_id,set_listed_by_id]=useState("");
		const [short_on_expiry,set_short_on_expiry]=useState(false);
		//manufacturer information
		const [manufactured_by,set_manufactured_by]=useState("");
		//seller information
		const [distributed_by,set_distributed_by]=useState("");
		//product information
		const [description_of_product,set_description_of_product]=useState("");
		const [chemical_name,set_chemical_name]=useState("");
		const [product_function,set_product_function]=useState("");
		const [brand,set_brand]=useState("");
		const [features_of_product,set_features_of_product]=useState("");
		const [application_of_product,set_application_of_product]=useState("");
		const [packaging_of_product,set_packaging_of_product]=useState("");
		const [storage_of_product,set_storage_of_product]=useState("");
		//category_of_product
		const [industry,set_industry]=useState("");
		const [technology,set_technology]=useState("");
		//website_link	
		const [website_link,set_website_link]=useState("")

		const payload = {
			name_of_product,
			email_of_lister,
			listed_by_id : 'admin',
			short_on_expiry,
			manufactured_by,
			distributed_by,
			description_of_product,
			chemical_name,
			function : product_function,
			brand,
			features_of_product,
			application_of_product,
			packaging_of_product,
			storage_of_product,
			data_sheet_url:'',
			safety_data_sheet_url:'',
			formulation_document_url:'',
			industry,
			technology,
			website_link
		}

	const handle_add_new_product=async()=>{
		console.log(payload)
		set_isloading(true)
		set_isfileupload(false)
		setTimeout(()=>{
			Add_New_Product(payload).then(()=>{
					toast({
		              title: '',
		              description: `${payload.name_of_product} has been created`,
		              status: 'success',
		              isClosable: true,
		            });
					router.back()
					set_isloading(false)
				}).catch((err)=>{
					toast({
	                    title: 'could not create a new product',
	                    description: err,
	                    status: 'error',
	                    isClosable: true,
	                })
	                set_isloading(false)
				})
			console.log(payload)
		},5000)
	}
	return(
		<Flex direction='column'>
			<Header />
			{isloading?
				<Loading/>
			:
				<>
					{isfileupload?
						<Flex h='90vh' justify='center' align='center'>
							<UploadFile prod_payload={payload} handle_add_new_product={handle_add_new_product} set_isloading={set_isloading}/>
						</Flex>
					:
						<Flex className={styles.productbody} direction='column' p='3' gap='3'>
							<Text fontSize='32px' fontWeight='bold'>Add New Product</Text>
							<Flex direction='column'>
								<Text>Name/Title of product</Text>
								<Input type='text' placeholder='Name of product/Brand' variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Brand Name</Text>
								<Input type='text' placeholder='Brand Name' variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Chemical Family</Text>
								<Input type='text' placeholder='Chemical Family' variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Description</Text>
								<Textarea type='text' placeholder='Description' variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
							</Flex>
							<Flex gap='2'>
								<Flex direction='column' flex='1'>
									<Text>Manufactured by:</Text>
									<Input type='text' placeholder='manufactured by' variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
								</Flex>
								<Flex direction='column' flex='1'>
									<Text>Sold by</Text>
									<Input type='text' placeholder='Sold by' variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
								</Flex>
							</Flex>
							<Flex direction='column'>
								<Text>Contact Email</Text>
								<Input type='email' placeholder='Contact to be used' variant='filled' onChange={((e)=>{set_email_of_lister(e.target.value)})}/>
							</Flex>
							<Flex gap='1'>
								<Flex direction='column' gap='2' flex='1'>
									<Text fontFamily='ClearSans-Bold'>Industry</Text>
									<Select variant='filled' placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
										{industries_data?.map((item)=>{
												return(
													<option key={item?._id} value={item?.title}>{item?.title}</option>

												)
											})}
							        </Select>
								</Flex>
								<Flex direction='column' gap='3' flex='1'>
									<Text fontFamily='ClearSans-Bold'>Technology</Text>
									<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
										{technologies_data?.map((item)=>{
											return(
												<option key={item?._id} value={item?.title}>{item?.title}</option>

											)
										})}
							        </Select>
								</Flex>
							</Flex>
							<Flex direction='column'>
								<Text>Function</Text>
								<Textarea type='text' placeholder='Function' variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
							</Flex>				
							<Flex direction='column'>
								<Text>Features & Benefits</Text>
								<Textarea type='text' placeholder='features and Benefits products' variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Application</Text>
								<Textarea type='text' placeholder='use commas to separate different applications' variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Packaging</Text>
								<Textarea type='text' placeholder='packaging infomation' variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Storage & Handling</Text>
								<Textarea type='text' placeholder='storage and product handling information' variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
							</Flex>
							<Flex direction='column'>
								<Text>Website_link</Text>
								<Input type='text' placeholder='link to website' variant='filled' onChange={((e)=>{set_website_link(e.target.value)})}/>
							</Flex>
							<Flex direction='column' gap='3' flex='1'>
								<Text fontFamily='ClearSans-Bold'>Short on Expiry</Text>
								<Select variant='filled' placeholder='List As Short on Expiry' onChange={((e)=>{e.target.value === 'true'? set_short_on_expiry(true): set_short_on_expiry(false)})}>
									<option value='false'>Product is not set to expire soon</option>
									<option value='true'>Product wil be expiring soon</option>
						        </Select>
							</Flex>
							<Flex gap='2'>
								<Button flex='1' bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_product}>Save and add product</Button>
				                <Button flex='1' bg='#000' borderRadius='0' color='#fff' onClick={(()=>{set_isfileupload(true)})}>Continue to upload files</Button>
				            </Flex>
			                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.push('/inventory')})}>Cancel</Button>
						</Flex>
					}
				</>
			}
		</Flex>
	)
}