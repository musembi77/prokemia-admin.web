import React,{useState} from 'react'
import {Flex,Text,Button,Input,Textarea,Select,Checkbox} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header';
import Add_New_Product from '../api/Products/add_new_product.js'

function Product(){
	const router = useRouter();

	const [name_of_product,set_name_of_product]=useState("");
	const [email_of_lister,set_email_of_lister]=useState("");
	const [listed_by_id,set_listed_by_id]=useState("");
	const [short_on_expiry,set_short_on_expiry]=useState("");
	//manufacturer information
	const [manufactured_by,set_manufactured_by]=useState("");
	const [manufactured_date,set_manufactured_date]=useState("");
	const [expiry_date,set_expiry_date]=useState("");
	//seller information
	const [distributed_by,set_distributed_by]=useState("");
	const [website_link_to_Seller,set_website_link_to_Seller]=useState("");
	//product information
	const [description_of_product,set_description_of_product]=useState("");
	const [chemical_name,set_chemical_name]=useState("");
	const [product_function,set_product_function]=useState("");
	const [brand,set_brand]=useState("");
	const [features_of_product,set_features_of_product]=useState("");
	const [application_of_product,set_application_of_product]=useState("");
	const [packaging_of_product,set_packaging_of_product]=useState("");
	const [storage_of_product,set_storage_of_product]=useState("");
	//documents
	const [data_sheet,set_data_sheet]=useState("");
	const [safety_data_sheet,set_safety_data_sheet]=useState("");
	const [formulation_document,set_formulation_document]=useState("");
	//category_of_product
	const [industry,set_industry]=useState("");
	const [technology,set_technology]=useState("");
	//featured status
	const [sponsored,set_sponsored]=useState("");
	//verification_status
	const [verification_status,set_verification_status]=useState("");

	const payload = {
		name_of_product,
		email_of_lister,
		listed_by_id,
		short_on_expiry :false,
		manufactured_by,
		manufactured_date,
		expiry_date,
		distributed_by,
		website_link_to_Seller,
		description_of_product,
		chemical_name,
		function : product_function,
		brand,
		features_of_product,
		application_of_product,
		packaging_of_product,
		storage_of_product,
		data_sheet,
		safety_data_sheet,
		formulation_document,
		industry,
		technology,
		sponsored,
		verification_status,
	}
	const handle_add_new_product=async()=>{
		await Add_New_Product(payload).then(()=>{
			alert("successfully created a new product")
			router.push("/inventory")
		})
	}
	return(
		<Flex direction='column'>
			<Header />
			<Flex className={styles.productbody} direction='column' p='3' gap='3'>
				<Text fontSize='32px' fontWeight='bold'>Add New Product</Text>
				<Flex direction='column'>
					<Text>Name</Text>
					<Input type='text' placeholder='Name of product/Brand' variant='filled' onChange={((e)=>{set_name_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured by:</Text>
					<Input type='text' placeholder='manufactured by' variant='filled' onChange={((e)=>{set_manufactured_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Distributed by</Text>
					<Input type='text' placeholder='Distributed by' variant='filled' onChange={((e)=>{set_distributed_by(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Manufactured date</Text>
					<Input type='date' placeholder='Manufactured date' variant='filled' onChange={((e)=>{set_manufactured_date(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Description</Text>
					<Textarea type='text' placeholder='Description' variant='filled' onChange={((e)=>{set_description_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Chemical name</Text>
					<Input type='text' placeholder='Chemical Name' variant='filled' onChange={((e)=>{set_chemical_name(e.target.value)})}/>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text fontFamily='ClearSans-Bold'>Industry</Text>
					<Select variant='filled' placeholder='Select Industry' onChange={((e)=>{set_industry(e.target.value)})}>
			          <option value='personalcare'>Personal Care</option>
			          <option value='hi&i'>H I & I</option>
			          <option value='building&construction'>Building and Construction</option>
			          <option value='food&nutrition'>Food and Nutrition</option>
			        </Select>
				</Flex>
				<Flex direction='column' gap='3'>
					<Text fontFamily='ClearSans-Bold'>Technology</Text>
					<Select variant='filled' placeholder='Select Technology' onChange={((e)=>{set_technology(e.target.value)})}>
			          <option value='pharmaceuticals'>Pharmaceuticals</option>
			          <option value='cosmetics'>Cosmetics</option>
			        </Select>
				</Flex>
				<Flex direction='column'>
					<Text>Function</Text>
					<Input type='text' placeholder='Function' variant='filled' onChange={((e)=>{set_product_function(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Brand</Text>
					<Input type='text' placeholder='Brand' variant='filled' onChange={((e)=>{set_brand(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>expiry date</Text>
					<Input type='date' placeholder='expiry date' variant='filled' onChange={((e)=>{set_expiry_date(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Data Sheet</Text>
					<Input type='file' placeholder='product data sheet' variant='filled' onChange={((e)=>{set_data_sheet(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Formulation Document</Text>
					<Input type='file' placeholder='Formulation Dcument' variant='filled' onChange={((e)=>{set_formulation_document(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Safety Data Sheet</Text>
					<Input type='file' placeholder='safety_data_sheet Document' variant='filled' onChange={((e)=>{set_safety_data_sheet(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Features & Benefits</Text>
					<Input type='text' placeholder='features and Benefits products' variant='filled' onChange={((e)=>{set_features_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Application</Text>
					<Input type='text' placeholder='use commas to separate different applications' variant='filled' onChange={((e)=>{set_application_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Packaging</Text>
					<Input type='text' placeholder='packaging infomation' variant='filled' onChange={((e)=>{set_packaging_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>Storage & Handling</Text>
					<Input type='text' placeholder='storage and product handling information' variant='filled' onChange={((e)=>{set_storage_of_product(e.target.value)})}/>
				</Flex>
				<Flex direction='column'>
					<Text>List as Short on Expiry</Text>
					<Checkbox defaultChecked bg='#eee' p='2' onChange={((e)=>{set_short_on_expiry(e.target.value)})}>Short on Expiry</Checkbox>
				</Flex>
                <Button bg='#009393' borderRadius='0' color='#fff' onClick={handle_add_new_product}>Add new Product</Button>
                <Button bg='#eee' borderRadius='0' color='red' onClick={(()=>{router.push('/inventory')})}>Cancel</Button>
		</Flex>
		</Flex>
	)
}

export default Product;