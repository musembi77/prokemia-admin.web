import React from 'react'
import {Flex,Text,Button,Input} from '@chakra-ui/react';
import Header from '../components/Header.js';

function Settings(){
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column' p='2' gap='2'>
				<Text fontSize='24px' fontWeight='bold'>Settings</Text>

				<Button bg='#009393' color="#fff">Add new Admin user</Button>	
				<Text fontSize='14'>assign different roles to administrators </Text>
				<Flex direction='column' gap='2'>
					{users.map((user)=>{
						return(
							<Flex borderRadius='5' justify='space-between' p='3' bg='#eee'>
								<Text>{user.name}</Text>
								<Text color={user.status? 'green' : 'orange'} >{user.status? 'Active' : 'Not Logged'}</Text>
							</Flex>
						)
					})}
				</Flex>
				<Button bg='#fff' border='1px solid red'>Remove User</Button>
				<Text fontWeight='bold' fontSize='20px' borderBottom='1px solid #000'>Password Management</Text>
				<Flex direction='column' gap='2'>
					{users.map((user)=>{
						return(
							<Flex borderRadius='5' direction='column' p='3' bg='#eee' gap='1'>
								<Text>{user.name}</Text>
								<Input bg='#fff' type='password' value={user.password}/>
								<Text color='#009393'>Edit</Text>
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
		name:'Admin-1',
		status:true,
		password:'admin-1'
	},
	{
		name:'Admin-2',
		status:false,
		password:'admin-2'
	},
	{
		name:'tech',
		status:true,
		password:'tech'
	},
	{
		name:'Sales',
		status:true,
		password:'sales'
	},
	{
		name:'Support',
		status:true,
		password:'Support'
	},
]