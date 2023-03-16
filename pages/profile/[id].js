//modules imports
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import {Flex,Text,Button,Input,InputGroup,InputRightElement,Image,useToast} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
//icons-imports
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Visibility,VisibilityOff} from '@mui/icons-material'
//components imports
import Header from '../../components/Header.js'
//api-calls
import Get_Admin_User from '../api/auth/get_admin_user.js'
import Edit_Admin_User from '../api/auth/edit_admin_user.js'
//utils
import {storage} from '../../components/firebase.js';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";

export default function Profile(){
	const [show, setShow] = useState(false);
  	const handleClick = () => setShow(!show);

	const router = useRouter();
    const cookies = new Cookies();
	
    const id = router.query
    console.log(id)
    
    const payload = {
        _id : id.id
    }

    const [user_data,set_user_data]=useState('');

	const [edit,setedit]=useState(false);

	const fetch_admin_user_data=async()=>{
        await Get_Admin_User(payload).then((res)=>{
            console.log(res.data)
            set_user_data(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    useEffect(()=>{
        console.log(id)
        if (id.id === 'undefined' || !id.id ){
            alert("Broken link..., redirecting")
            console.log("Broken link..., redirecting")
            return;
        }else{
            fetch_admin_user_data()
        }      
    },[id])

    const Handle_Change_Password=async()=>{
		router.push("/password_reset")
	}

	return(
		<Flex p='' direction='column' gap='2' w='100%' overflowY='scroll' h='100vh'>
            <Header/>
			<Text fontSize='34px' textDecoration='1px solid underline #009393' fontWeight='bold'>MyProfile</Text>
			{edit ?
				<EditProfile setedit={setedit} user_data={user_data}/>
			:
				<Flex direction='column' gap='2' p='2'>
					<Flex gap='3' direction='' align='center'>
						{user_data?.user_image == ''? 
							<AccountCircleIcon style={{fontSize:'150px',padding:'10px'}}/> 
						: 
							<Flex gap='2' >
								<Image boxSize='200px' src={user_data.user_image} alt='profile photo' borderRadius='5' boxShadow='lg' objectFit='cover'/>
							</Flex>
						}
						<Flex direction='column' justify='space-around' gap='4' w='100%' bg='#eee' p='2' borderRadius='5' boxShadow='dark-lg'>
							<Text p='1' borderRadius='5'>User_name: {user_data?.user_name}</Text>
							<Text p='1' borderRadius='5'>Role: {user_data?.role}</Text>
							<Button onClick={(()=>{setedit(true)})} bg='#009393' color='#fff'>Edit Profile</Button>	
						</Flex>
					</Flex>
				</Flex>
			}
		</Flex>
	)
}

const EditProfile=({setedit,user_data})=>{
	const toast = useToast();
	const cookies = new Cookies();
	const [user_name,set_user_name]=useState(user_data?.user_name);
	const [image,set_image]=useState('');
	const [user_image_url,set_user_image_url]=useState(user_data?.user_image);

	const payload = {
		_id: user_data?._id,
		user_name,
		user_image: user_image_url
	}
	const profile_upload_function=async()=>{
		/**handles uploads profile image functions to firebase storage**/
		console.log(image)
		if (image == ''){
			toast({
				title: '',
				description: 'Missing image details',
				status: 'info',
				isClosable: true,
			});
		}else{
			await handle_profile_image_upload().then((res)=>{
				if (res == null || res == undefined || !res){
					return;
				}else{
					const payload = {
						_id: user_data?._id,
						user_image: res
					}
					Edit_Admin_User(payload).then(()=>{
						toast({
							title: '',
							description: 'successfuly updated your profile photo',
							status: 'success',
							isClosable: true,
						});
					}).then(()=>{
						setedit(false)
					}).catch((err)=>{
						toast({
							title: '',
							description: `${err.response.data}`,
							status: 'error',
							isClosable: true,
						});
					})
				}
			})
		}
	}

	const handle_profile_image_upload=async()=>{
		/**uploads profile image to firebase storage**/
		if (image.name == undefined){
			toast({
				title: 'upload process cancelled',
				description: 'could not find image selected',
				status: 'info',
				isClosable: true,
			});
			return;
		}else{
			console.log(image.name)
			const profile_photo_documentRef = ref(storage, `profile_photo/${image?.name + v4()}`);
			const snapshot= await uploadBytes(profile_photo_documentRef,image)
			const file_url = await getDownloadURL(snapshot.ref)
			cookies.set('image_url', file_url, { path: '/' });
			return file_url
		}
	}

	const handle_Edit_Profile=async()=>{
		await Edit_Admin_User(payload).then(()=>{
			toast({
				title: '',
				description: 'Your account has been edited successfully, refresh to see changes',
				status: 'success',
				isClosable: true,
			});
		}).then(()=>{
			//console.log(payload)
			setedit(false)
		}).catch((err)=>{
			toast({
				title: '',
				description: `${err.response.data}`,
				status: 'error',
				isClosable: true,
			});
		})
	}
	return(	
		<Flex gap='3' direction='column' overflowY='scroll' h='80vh' p='2'>
			{user_data?.user_image == '' || !user_data?.user_image? 
				<Flex gap='2' >
					<AccountCircleIcon style={{fontSize:'150px',backgroundColor:"#eee",borderRadius:'150px'}} />
					<Flex direction='column' gap='2'>
						<Text>Select Image to set as Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_image(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={!image? true: false}>Upload profile photo</Button>
					</Flex>
				</Flex>
			: 
				<Flex gap='2' >
					<Image boxSize='200px' src={user_data.user_image} alt='profile photo' boxShadow='lg' objectFit='cover'/>
					<Flex direction='column' gap='2'>
						<Text>Select Image to change Profile Image</Text>
						<Input type='file' placeholder='Select Image to set as Profile Image' accept='.jpg,.png,.jpeg' variant='filled' onChange={((e)=>{set_image(e.target.files[0])})}/>
						<Button bg='#009393' color='#fff' onClick={profile_upload_function} disabled={image == ''? true: false}>Change profile photo</Button>
					</Flex>
				</Flex>
			}
			<Flex direction='column' gap='3' w='100%'>
					<Flex direction='column'>
						<Text>User_name</Text>
						<Input type='text' placeholder={user_data?.user_name} variant='filled' onChange={((e)=>{set_user_name(e.target.value)})}/>
					</Flex>
					<Flex gap='2'>
						<Button onClick={handle_Edit_Profile} bg='#009393' color='#fff' flex='1'>Save</Button>
						<Button onClick={(()=>{setedit(false)})} bg='#fff' color='#000' border='1px solid red' flex='1'>Cancel</Button>
					</Flex>
				</Flex>
			</Flex>
	)
}
