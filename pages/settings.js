import React,{useEffect, useState} from 'react'
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import Header from '../components/Header.js';
import AddNewAdmin from '../components/modals/AddNewAdmin.js';
import RemoveAdmin from '../components/modals/RemoveAdmin.js';
import Get_Admin_Users from './api/auth/get_admin_users?.js';

function Settings(){
	const [isaddnewadminModalvisible,setisaddnewadminModalvisible]=useState(false);
	const [isremoveModalvisible,setisremoveModalvisible]=useState(false);
	const [users,set_users]=useState([])
	useEffect(()=>{
		Get_Admin_Users().then((response)=>{
			set_users(response.data)
		}).catch((err)=>{
			alert("error")
		})
	},[])
	console.log(users)
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column' p='2' gap='2'>
				<Text fontSize='28px' fontWeight='bold'>Settings</Text>
				<AddNewAdmin isaddnewadminModalvisible={isaddnewadminModalvisible} setisaddnewadminModalvisible={setisaddnewadminModalvisible}/>
				<RemoveAdmin isremoveModalvisible={isremoveModalvisible} setisremoveModalvisible={setisremoveModalvisible}/>
				<Text fontSize='14'>assign different roles to administrators </Text>
				<Flex direction='column' gap='2'>
					{users?.map((user)=>{
						return(
							<Flex key={user._id} borderRadius='5' justify='space-between' p='3' bg='#eee'>
								<Flex direction='column'>
									<Text>{user.user_name}</Text>
									<Text>Role:{user.role}</Text>
								</Flex>
								<Text color={user.login_status? 'green' : 'orange'} >{user.login_status? 'Active' : 'Not Logged'}</Text>
							</Flex>
						)
					})}
				</Flex>
				<Button bg='#009393' color="#fff" onClick={(()=>{setisaddnewadminModalvisible(true)})}>Add new Admin user</Button>
				<Text fontWeight='bold' fontSize='20px' borderBottom='1px solid #000'>Password Management</Text>
				<Flex direction='column' gap='2'>
					{users?.map((user)=>{
						return(
							<Flex key={user._id} borderRadius='5' direction='column' p='3' bg='#eee' gap='1'>
								<Text fontWeight='bold' fontSize='20px'>{user.user_name}</Text>
								<Input bg='#fff' type='password' placeholder={user.user_password}/>
								<Flex gap='2' mt='2'>
									<Text color='#000'>Edit</Text>
									<Text color='red' cursor='pointer' onClick={(()=>{setisremoveModalvisible(true)})}>Remove Admin User</Text>
								</Flex>
							</Flex>
						)
					})}
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Settings;

const users=[
	{
		id:1,
		name:'Admin-1',
		status:true,
		password:'admin-1'
	},
	{
		id:2,
		name:'Admin-2',
		status:false,
		password:'admin-2'
	},
	{
		id:3,
		name:'tech',
		status:true,
		password:'tech'
	},
	{
		id:4,
		name:'Sales',
		status:true,
		password:'sales'
	},
	{
		id:5,
		name:'Support',
		status:true,
		password:'Support'
	},
]