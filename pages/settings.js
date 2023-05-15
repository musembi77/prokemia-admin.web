import React,{useEffect, useState} from 'react'
import {Flex,Text,Button,Input,Image,InputGroup,InputRightElement} from '@chakra-ui/react';
import Header from '../components/Header.js';
import AddNewAdmin from '../components/modals/AddNewAdmin.js';
import RemoveAdmin from '../components/modals/RemoveAdmin.js';
import Get_Admin_Users from './api/auth/get_admin_users?.js';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import {useRouter} from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Visibility,VisibilityOff} from '@mui/icons-material'

export default function Settings(){
	const [isaddnewadminModalvisible,setisaddnewadminModalvisible]=useState(false);
	
	const [users,set_users]=useState([]);
	const cookies = new Cookies();
  	

	useEffect(()=>{
		let token = cookies.get('admin_token');
  	let decoded = jwt_decode(token);
  	//console.log(decoded)		
		Get_Admin_Users().then((response)=>{
			set_users(response.data)
		}).catch((err)=>{
			alert("error")
		})
	},[])
	//console.log(users)
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column' p='2' gap='2'>
				<Text fontSize='28px' fontWeight='bold'>Settings</Text>
				<AddNewAdmin isaddnewadminModalvisible={isaddnewadminModalvisible} setisaddnewadminModalvisible={setisaddnewadminModalvisible}/>
				<Text fontSize='14'>assign different roles to administrators </Text>
				<Flex direction='column' gap='2'>
					{users?.map((user)=>{
						return(
							<Flex key={user._id} borderRadius='5' justify='space-between' p='3' bg='#eee'>
								<Flex direction='column'>
									<Text>{user.user_name}</Text>
									<Text>Role:{user.role}</Text>
								</Flex>
								<Text color={user.login_status? 'green' : 'orange'} >{user.login_status? 'Active' : 'Not Logged in'}</Text>
							</Flex>
						)
					})}
				</Flex>
				<Button bg='#009393' color="#fff" onClick={(()=>{setisaddnewadminModalvisible(true)})}>Add new Admin user</Button>
				<Text fontWeight='bold' fontSize='20px' borderBottom='1px solid #000'>Account Management</Text>
				<Flex direction='column' gap='2'>
					{users?.map((user)=>{
						return(
							<Admin_User_Item key={user._id} user={user} />
						)
					})}
				</Flex>
			</Flex>
		</Flex>
	)
}

const Admin_User_Item=({user})=>{
	const [isremoveModalvisible,setisremoveModalvisible]=useState(false);
	return(
		<Flex key={user._id} borderRadius='5' direction='column' p='3' bg='#eee' gap='1'>
			<RemoveAdmin isremoveModalvisible={isremoveModalvisible} setisremoveModalvisible={setisremoveModalvisible} admin_data={user}/>
			<Text fontWeight='bold' fontSize='20px'>{user.user_name}</Text>
			<Text>Role: {user.role}</Text>
			<Flex gap='2' mt='2' align='center'>
				<Button color='#000' border='1px solid red'  cursor='pointer' onClick={(()=>{setisremoveModalvisible(true)})}>Remove {user?.user_name}</Button>
			</Flex>
		</Flex>
	)
}