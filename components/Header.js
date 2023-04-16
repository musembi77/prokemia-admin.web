import React,{useState,useEffect} from 'react'
import {Flex, Text,Button,Stack,Divider,useToast,Image} from '@chakra-ui/react'
import {Menu,Receipt,Close,Add,HorizontalRule,ArrowForward,Settings,Groups,Tune,Widgets,FactCheck,Inventory,Chat} from '@mui/icons-material';
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import Cookies from 'universal-cookie';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import jwt_decode from "jwt-decode";
import Get_Admin_User from '../pages/api/auth/get_admin_user.js'
import Edit_Admin_User from '../pages/api/auth/edit_admin_user.js'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header(){
	const [showmenubar,setshowmenubar]=useState(false);
	const router = useRouter();
	const toast = useToast();
	const cookies = new Cookies();
  	let token = cookies.get('admin_token');
	const [user_data,set_user_data] = useState('')

  	useEffect(()=>{
	    if (!token){
	    	toast({
              title: '',
              description: `You need to signed in, to have access`,
              status: 'info',
              isClosable: true,
            });
	    	router.push("/")
	    }else{
			let decoded = jwt_decode(token);
			//console.log(decoded);
			let id = decoded?.id
			fetch_user_details(id)
		}
	},[token])
	const handle_LogOut=async()=>{
		const payload ={
			_id : user_data?._id,
			login_status : false
		}
		await Edit_Admin_User(payload).then(()=>{
			cookies.remove('admin_token', { path: '/' });
			toast({
              title: 'successfully logged out',
              description: ``,
              status: 'success',
              isClosable: true,
            });
		}).then(()=>{
			router.push('/')
		}).catch((err)=>{
			toast({
              title: 'error while logging out',
              description: ``,
              status: 'error',
              isClosable: true,
            });
			console.log(err);
		})
	}

	const fetch_user_details=async(id)=>{
		////console.log(id)
		const payload = {
			_id : id
		}
		//console.log(payload)
		await Get_Admin_User(payload).then((res)=>{
			//console.log(res.data)
			set_user_data(res.data)
		}).catch((err)=>{
			if (err.response?.status == 500){
				alert('You do not have access to this platform.')
				router.push('/')
				return ;
			}
			console.log(err)
		})
	}
	return(
		<Flex cursor='pointer' bg='#fff' fontFamily='ClearSans-Bold' h='70px' p='2' justify='space-between' align='center' position='sticky' top='0px' zIndex='10'>
			<Flex bg='#009393' boxShadow='lg' p='2' align='center' gap='1' borderRadius='5' color='#fff' onClick={(()=>{router.push(`/profile/${user_data?._id}`)})}>
				{user_data?.user_image == '' || !user_data?.user_image? <AccountCircleIcon/> : <Image src={user_data?.user_image} boxSize='25px' boxShadow='lg' borderRadius='40px' alt='pp'/>}
				<Text ml='1' fontSize='14px' >{user_data?.user_name}</Text>
			</Flex>
			<Flex align='center' gap='3'>
				<Widgets onClick={(()=>{router.push("/dashboard")})}/>
				<NotificationsActiveIcon onClick={(()=>{router.push("/notifications")})}/>
				<Chat onClick={(()=>{router.push("/hub")})}/>
				<Button w='100%' bg='#000' color='#fff' onClick={handle_LogOut}>Log-out</Button>
				{showmenubar ? 
					<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
						:
					<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
				}
				{showmenubar ? 
					<MenuBar setshowmenubar={setshowmenubar} user_data={user_data}/>
						:
					null 
				}
			</Flex>
		</Flex>
	)
}

const navigation=[
	{
		id:1,
		title:'Inventory',
		link:'inventory',
		logo:<Inventory/>
	},
	{
		id:2,
		title:'Orders',
		link:'orders',
		logo:<Receipt/>
	},
	{
		id:3,
		title:'Distributors',
		link:'distributors',
		logo:<Groups/>
	},
	{
		id:4,
		title:'Salespersons',
		link:'salespersons',
		logo:<Groups/>
	},
	{
		id:5,
		title:'Manufacturers',
		link:'manufacturers',
		logo:<Groups/>
	},
	{
		id:6,
		title:'Customers',
		link:'customers',
		logo:<Groups/>
	},
	{
		id:7,
		title:'Control',
		link:'/util_controls',
		logo:<Tune/>
	},
]
const MenuBar=({user_data})=>{
	const [active,setActive]=useState(false);
	const [currentValue,setcurrentValue]=useState('');
	const router = useRouter()
	return(
		<Flex className={styles.HeaderNav} direction='column' gap='3' p='4' w='65vw' h='90vh' bg='#090F14' position='absolute' top='70px' right='0px' zIndex='2' overflowY='scroll'>
			{navigation.map((item)=>{
				return(
					<Flex p='1' _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}} key={item?.id} align='center' borderBottom='1px solid #fff' color='#fff' borderRadius='5' onClick={(()=>{router.push(`/${item.link}`)})}>
						{item.logo}
						<Text  p='2' fontSize='20px'  mb='0' >{item.title}</Text>
					</Flex>
				)
			})}
			<Flex p='1' _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}} align='center' borderBottom='1px solid #fff' color='#fff' borderRadius='5' onClick={(()=>{router.push(`/profile/${user_data?._id}`)})}>
				<AccountCircleIcon/>
				<Text  p='2' fontSize='20px'  mb='0' >Profile</Text>
			</Flex>
			{user_data?.role === 'Manager' || user_data?.role === 'IT'?
				<Flex p='1' _hover={{transform:"scale(1.03)",transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000"}} align='center' borderBottom='1px solid #fff' color='#fff' borderRadius='5' onClick={(()=>{router.push(`/settings`)})}>
					<Settings/>
					<Text  p='2' fontSize='20px'  mb='0' >Settings</Text>
				</Flex>
				:null}
		</Flex>
	)
}
