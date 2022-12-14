import React,{useState,useEffect} from 'react'
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement,useToast} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import {useRouter} from 'next/router'
import SignIn from './api/auth/signin.js'
import Cookies from 'universal-cookie';

export default function ClientSignUp(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);
  	const router = useRouter();
	const toast = useToast();

	const [user_password,set_user_password]=useState('');
	const [user_name,setuser_name]=useState('');
	const cookies = new Cookies();
  	let token = cookies.get('admin_token');
	let route = '';

	const payload = {
		user_name,
		user_password
	}

  	const handleSignIn=(event)=>{
		//console.log(payload)
		event.preventDefault();
  		if(user_password === '' || user_name === '')
			toast({
				title: '',
				description: 'All inputs are required',
				status: 'info',
				isClosable: true,
			});
  			//router.push(`/dashboard`)
		SignIn(payload).then((response)=>{
			console.log(response)
			if (response.status === 200){
				router.push("/dashboard")
				return toast({
		              title: '',
		              description: 'Successfully Logged in',
		              status: 'success',
		              isClosable: true,
		            });
			}
			else{
				return toast({
		                    title: 'Error logging in',
		                    description: response.data,
		                    status: 'error',
		                    isClosable: true,
		                  })
			}
		})
  	}

  	// useEffect(()=>{
  	// 	if (token || token !== null){
  	// 		router.push("/dashboard")
  	// 	}
  	// },[token])
	return(
		<Flex h='100vh' className={styles.SigninBody}>
			<Flex className={styles.authSection} gap='2' p='8'>
				<Text w='40vw'  fontSize='4rem' color='#fff' fontFamily='ClearSans-bold'>Welcome Back!</Text>
			</Flex>
				<Flex className={styles.authForm} gap='2' direction='column'>
					<Text fontSize='2.5rem' fontFamily='ClearSans-bold'><span style={{borderBottom:"4px solid #009393",borderRadius:"3px"}}>Sign</span> In</Text>
					<Text color='grey'>Welcome back, Please sign in to your account.</Text>
					<Flex direction='column' gap='2'>
						<Text fontWeight='bold'>Username</Text>
						<Input required type='text' placeholder='Username' variant='filled' onChange={((e)=>{setuser_name(e.target.value)})}/>
					</Flex>
					<Text fontWeight='bold'>Password</Text>
					<InputGroup size='md'>
						<Input
						pr='4.5rem'
						type={show ? 'text' : 'password'}
						placeholder='Enter password'
						variant='filled'
						onChange={((e)=>{set_user_password(e.target.value)})}
						required
						/>
							<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
							{show ? <VisibilityOff/> : <Visibility/>}
							</Button>
						</InputRightElement>
					</InputGroup>
					<Text cursor='pointer' fontSize='14px' color='red'> Forgot Password?</Text>
					<Button type="submit" onClick={handleSignIn} bg='#009393' color='#fff'>Sign In</Button>
				</Flex>
		</Flex>
	)
}

const passwords=[
	{
		acc:'admin',
		password:'admin'
	},
]