import React,{useState,useEffect} from 'react'
import {Flex, Text,Button,Stack,Divider,useToast,Image} from '@chakra-ui/react'
import {Menu,Receipt,Close,Add,Settings,Groups,Tune,Widgets,FactCheck,Inventory,Chat} from '@mui/icons-material';
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
				<Button w='120%' p='3' fontSize='14px' bg='#009393' color='#fff' onClick={(()=>{router.push(`/product/add_product`)})}>
					<Add style={{fontSize:'18px'}}/>
					Add Product
				</Button>
				<Button w='100%' bg='#000' color='#fff' onClick={handle_LogOut}>Log-out</Button>
				{showmenubar ? 
					<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
						:
					<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
				}
				{showmenubar ? 
					<MenuBar setshowmenubar={setshowmenubar} showmenubar={showmenubar} user_data={user_data}/>
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
		link:'util_controls',
		logo:<Tune/>
	},
]
const MenuBar=({setshowmenubar,showmenubar,user_data})=>{
	const router = useRouter()
	return(
		<Flex className={styles.HeaderNav} direction='column' gap='2' p='4' w='65vw' h='90vh' bg='#090F14' position='absolute' top='70px' right='0px' zIndex='2' overflowY='scroll'>
			<Flex gap='2' borderBottom='1px solid #fff' pb='3'>
				<Flex direction='column' flex='1' align='center' p='2' bg='#fff' borderRadius='5' onClick={(()=>{router.push("/dashboard");setshowmenubar(!showmenubar)})}>
					<Widgets />
					<Text fontSize='14px'  mb='0' >Dashboard</Text>
				</Flex>
				<Flex direction='column' flex='1' align='center' p='2' bg='#fff' borderRadius='5' onClick={(()=>{router.push("/notifications");setshowmenubar(!showmenubar)})}>
					<NotificationsActiveIcon />
					<Text fontSize='14px'  mb='0' >Notifications</Text>
				</Flex>
			</Flex>
			<Flex className={styles.HeaderNav_items} direction='column' h='90%' overflowY='scroll' w='100%' p='2'>
				{navigation.map((item)=>{
					return(
						<Flex p='1' _hover={{transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000",borderRadius:'5'}} key={item?.id} align='center' color='#fff' onClick={(()=>{router.push(`/${item.link}`);setshowmenubar(!showmenubar)})}>
							{item.logo}
							<Text  p='2' fontSize='18px'  mb='0' >{item.title}</Text>
						</Flex>
					)
				})}
				<Flex p='1' _hover={{transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000",borderRadius:'5'}} align='center' color='#fff' onClick={(()=>{router.push(`/profile/${user_data?._id}`);setshowmenubar(!showmenubar)})}>
					<AccountCircleIcon/>
					<Text  p='2' fontSize='18px'  mb='0' >Profile</Text>
				</Flex>
				{user_data?.role === 'Manager' || user_data?.role === 'IT'?
					<Flex p='1' _hover={{transition:'ease-out 0.9s all',backgroundColor:"#fff",color:"#000",borderRadius:'5'}} align='center' color='#fff' onClick={(()=>{router.push(`/settings`);setshowmenubar(!showmenubar)})}>
						<Settings/>
						<Text  p='2' fontSize='18px'  mb='0' >Settings</Text>
					</Flex>
					:null}
			</Flex>
		</Flex>
	)
}
