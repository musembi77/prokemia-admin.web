import React,{useState,useEffect} from 'react'
import {Flex, Text,Button,Stack,Divider} from '@chakra-ui/react'
import {Menu,Receipt,Close,Add,HorizontalRule,ArrowForward,Settings,Groups,Tune,Widgets,FactCheck,Inventory,Chat} from '@mui/icons-material';
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import Cookies from 'universal-cookie';

function Header(){
	const [showmenubar,setshowmenubar]=useState(false);
	const router = useRouter();
	const cookies = new Cookies();
  	let token = cookies.get('admin_token');

  	useEffect(()=>{
	    if (!token)
	    	router.push("/")
	},[token])
	const handle_LogOut=()=>{
		cookies.remove('admin_token', { path: '/' });
		// router.reload()
		router.push('/')
	}
	return(
		<Flex cursor='pointer' bg='#fff' fontFamily='ClearSans-Bold' h='70px' p='2' justify='space-between' align='center' position='sticky' top='0px' zIndex='10'>
			<Text onClick={(()=>{router.push('/dashboard')})} fontSize='28px' color='#000' fontWeight='bold' >Admin</Text>
			<Flex align='center' gap='2'>
				<Button w='100%' bg='#000' color='#fff' onClick={handle_LogOut}>Log-out</Button>
				{showmenubar ? 
					<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
						:
					<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
				}
				{showmenubar ? 
					<MenuBar setshowmenubar={setshowmenubar} />
						:
					null 
				}
			</Flex>
		</Flex>
	)
}

export default Header;

const navigation=[
	{
		id:1,
		title:'Dashboard',
		link:'dashboard',
		logo:<Widgets/>
	},
	{
		id:2,
		title:'Notifications',
		link:'notifications',
		logo:<FactCheck/>
	},
	{
		id:3,
		title:'Inventory',
		link:'inventory',
		logo:<Inventory/>
	},
	{
		id:4,
		title:'Orders',
		link:'orders',
		logo:<Receipt/>
	},
	{
		id:5,
		title:'The Hub',
		link:'hub',
		logo:<Chat/>
	},
	{
		id:6,
		title:'Distributors',
		link:'distributors',
		logo:<Groups/>
	},
	{
		id:7,
		title:'Salespersons',
		link:'salespersons',
		logo:<Groups/>
	},
	{
		id:8,
		title:'Manufacturers',
		link:'manufacturers',
		logo:<Groups/>
	},
	{
		id:9,
		title:'Customers',
		link:'customers',
		logo:<Groups/>
	},
	{
		id:10,
		title:'Control',
		link:'controls',
		logo:<Tune/>
	},
	{
		id:11,
		title:'Settings',
		link:'settings',
		logo:<Settings/>
	},
]
const MenuBar=()=>{
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	return(
		<Flex className={styles.HeaderNav} direction='column' gap='3' p='4' w='65vw' h='90vh' bg='#090F14' position='absolute' top='70px' right='0px' zIndex='2' overflowY='scroll'>
			{navigation.map((item)=>{
				return(
					<Flex p='1' _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}} key={item.id} align='center' borderBottom='1px solid #fff' color='#fff' borderRadius='5' onClick={(()=>{router.push(`/${item.link}`)})}>
						{item.logo}
						<Text  p='2' fontSize='20px'  mb='0' >{item.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}
