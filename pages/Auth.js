import React,{useState} from 'react'
import {Flex,Center,Text,Button,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import {useRouter} from 'next/router'

export default function ClientSignUp(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);
  	const router = useRouter();

  	const [password,setpassword]=useState('');
  	const [username,setUsername]=useState('');
  	let route = '';

  	const handleSignIn=()=>{
  		if(password === 'admin' && username === 'admin')
  			router.push(`/dashboard`)
  		else{
  			alert('wrong credentials,contact administrator')
  		}
  	}
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
					<Input type='text' placeholder='Username' variant='filled' onChange={((e)=>{setUsername(e.target.value)})}/>
				</Flex>
				<Text fontWeight='bold'>Password</Text>
				<InputGroup size='md'>
					<Input
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					placeholder='Enter password'
					variant='filled'
					onChange={((e)=>{setpassword(e.target.value)})}
					required
					/>
						<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
						{show ? <VisibilityOff/> : <Visibility/>}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Text cursor='pointer' fontSize='14px' color='red'> Forgot Password?</Text>
				<Button bg='#009393' color='#fff' onClick={handleSignIn}>Sign In</Button>
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