import React from 'react'
import {Flex,Text,Button} from '@chakra-ui/react'
import Header from '../components/Header.js';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Dashboard(){
	return(
		<Flex direction='column'>
			<Header/>
			<Text m='2' fontWeight='bold' fontSize='24px'>Welcome,<br/>Admin</Text>
			<Flex direction='' p='2' gap='2' borderBottom='1px solid #000'>
				<Flex flex='1' direction='column' bg='#eee' borderRadius='5' p='2' gap='2'>
					<Text fontWeight='bold' fontSize='20px'>TOTAL REVENUE</Text>
					<Text bg='#fff' p='2'>Kes 100,000</Text>
					<Text>Distributors</Text>
					<Text bg='#fff' p='2'>200</Text>
					<Text>SalesPersons</Text>
					<Text bg='#fff' p='2'>30</Text>
				</Flex>
				<Flex gap='2' direction='column' gap='2' w='40%'>
					<Text fontWeight='bold' fontSize='20px'>Manufacturers</Text>
					<Flex direction='column' gap='2'>
						<Text bg='#eee' p='2' borderRadius='2'>Dupoint </Text>
						<Text bg='#eee' p='2' borderRadius='2'>Sahol Inc.co</Text>
						<Text bg='#eee' p='2' borderRadius='2'>Sahol Inc.co</Text>
						<Button bg='#009393' color='#fff'>Add new Manufacturer</Button>
					</Flex>
				</Flex>
			</Flex>
				<Flex m='2' flex='1' direction='column' borderBottom='1px solid #000' bg='#eee' borderRadius='5' p='2' gap='2'>
					<Flex justify='space-between' align='center'>
						<Text fontWeight='bold' fontSize='20px'>Pending Approval</Text>
						<Text color='#009393'>view all</Text>
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Products</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Distributors</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Salespersons</Text>
						<NotificationsIcon />
					</Flex>
					<Flex align='center' bg='#fff' p='2' justify='space-between'>
						<Text>Manufacturers</Text>
						<NotificationsIcon />
					</Flex>
				</Flex>
			<Flex m='2' direction='column' gap='2'>
					<Flex align='center' justify='space-between'>
						<Text fontWeight='bold' fontSize='20px'>Products - 200</Text>
						<Text color='#009393'>view all</Text>
					</Flex>
					<Flex direction='column' p='2' bg='#eee'>
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
					<Flex direction='column' p='2'  bg='#eee' >
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
					<Button bg='#009393' color='#fff'>Add new Product</Button>
			</Flex>
			<Flex m='2' direction='column' gap='2' borderBottom='1px solid #000'>
					<Flex align='center' justify='space-between'>
						<Text fontWeight='bold' fontSize='20px'>Salespersons - 20</Text>
						<Text color='#009393'>view all</Text>
					</Flex>
					<Flex direction='column' p='2' bg='#eee'>
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
					<Flex direction='column' p='2'  bg='#eee' >
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
			</Flex>
			<Flex m='2' direction='column' gap='2'>
					<Flex align='center' justify='space-between'>
						<Text fontWeight='bold' fontSize='20px'>Distributors - 20</Text>
						<Text color='#009393'>view all</Text>
					</Flex>
					<Flex direction='column' p='2' bg='#eee'>
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
					<Flex direction='column' p='2'  bg='#eee' >
						<Text   borderRadius='2'>Dupoint </Text>
						<Text   borderRadius='2'>Industry:Agriculture</Text>
						<Text   borderRadius='2'>Technology:-</Text>
						<Text   borderRadius='2'>listed by:Sahol Inc.co</Text>
					</Flex>
			</Flex>
		</Flex>
	)}

export default Dashboard;