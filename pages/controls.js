//modules imports
import React,{useState,useEffect}from 'react';
import {Flex,Text,Button,Image,Grid,useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router'
//components imports
import Header from '../components/Header.js';
import AddNewIndustryModal from '../components/modals/addNewIndustryModal.js';
import AddnewTechnology from '../components/modals/addNewTechnologyModal.js';
import AddnewCareer from '../components/modals/addNewCareerModal.js';
import Edit_Industry from '../components/modals/edit_industry.js';
import Edit_Technology from '../components/modals/edit_technology.js';
import View_Vacancy from '../components/modals/View_Vacancy_Modal.js';
//api_calls
import Get_Industries from './api/controls/get_industries.js';
import Get_Technologies from './api/controls/get_technologies.js';
import Delete_Industry from './api/controls/delete_industry.js';
import Delete_Technology from './api/controls/delete_technology.js';
import Delete_Vacancy from './api/careers/delete_vacancy.js';
import Get_Vacancies from './api/careers/get_vacancies.js';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Control(){
	const [isaddindustryModalvisible,setisaddindustryModalvisible]=useState(false);
	const [isaddtechnologyModalvisible,setisaddtechnologyModalvisible]=useState(false);
	const [isaddcareerModalvisible,setisaddcareerModalvisible]=useState(false);
	const [is_edit_industry_Modalvisible,set_is_edit_industry_Modalvisible]=useState(false);

	const [Industries_data,set_Industries_data]=useState([]);
	const [Technologies_data,set_Technologies_data]=useState([]);
	const [Vacancies_data,set_Vacanvies_data]=useState([]);

	const cookies = new Cookies();
	const router = useRouter()
    let token = cookies.get('admin_token');
    const [auth_role,set_auth_role]=useState("")

	useEffect(()=>{
		Get_Industries().then((response)=>{
			set_Industries_data(response.data)
		})
		Get_Technologies().then((response)=>{
			set_Technologies_data(response.data)
		})
		Get_Vacancies().then((response)=>{
			console.log(response.data)
			set_Vacanvies_data(response.data)
		})
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
	        set_auth_role(decoded?.role)
	      }
	},[])
	//console.log(Vacancies_data)
	return(
		<Flex direction='column'>
			<AddNewIndustryModal isaddindustryModalvisible={isaddindustryModalvisible} setisaddindustryModalvisible={setisaddindustryModalvisible} auth_role={auth_role}/>
			<AddnewTechnology isaddtechnologyModalvisible={isaddtechnologyModalvisible} setisaddtechnologyModalvisible={setisaddtechnologyModalvisible} auth_role={auth_role}/>
			<AddnewCareer isaddcareerModalvisible={isaddcareerModalvisible} setisaddcareerModalvisible={setisaddcareerModalvisible} auth_role={auth_role}/>
			<Header />
			<Flex direction='column' p='2' gap='2'>
				<Text fontSize='32px' fontWeight='bold'>Careers</Text>
				<Flex direction='column' gap='2' p='2'h='60vh' overflowY='scroll'>
					<Flex gap='2' direction='column' >
						{Vacancies_data?.map((item)=>{
							return (
								<Vacancy key={item._id} item={item}/>
							)
						})}
					</Flex>
				</Flex>
				<Button bg='#009393' h='50px' color='#fff' onClick={(()=>{setisaddcareerModalvisible(true)})}>Add new Career</Button>
			</Flex>
			<Flex direction='column' gap='2' p='2'>
				<Text borderBottom='1px solid #009393' fontSize='20px' fontWeight='bold'>Industry</Text>
				<Flex wrap='Wrap' gap='2' >
					{Industries_data?.map((item)=>{
						return (
							<Industry key={item._id} item={item} auth_role={auth_role}/>
						)
					})}
				</Flex>
				<Button bg='#009393' color='#fff' onClick={(()=>{setisaddindustryModalvisible(true)})}>Add new Industry</Button>
			</Flex>
			<Flex direction='column' gap='2' p='2'>
				<Text borderBottom='1px solid #009393' fontSize='20px' fontWeight='bold'>Technology</Text>
				<Flex wrap='Wrap' gap='2' >
					{Technologies_data?.map((item)=>{
						return (
							<Technology key={item._id} item={item} auth_role={auth_role}/>
						)
					})}
				</Flex>
				<Button bg='#009393' color='#fff' onClick={(()=>{setisaddtechnologyModalvisible(true)})}>Add new Technology</Button>
			</Flex>
		</Flex>
	)
}

export default Control;

const Industry=({item,auth_role})=>{
	const toast = useToast();
	const router = useRouter()
	const [is_edit_industry_Modalvisible,set_is_edit_industry_Modalvisible]=useState(false);
	const payload = {
		_id: item._id,
		auth_role
	}
	const handle_delete_industry=async()=>{
		await Delete_Industry(payload).then(()=>{
            toast({
              title: '',
              description: `${item?.title} has been deleted`,
              status: 'info',
              isClosable: true,
            });
            setTimeout(()=>{
            	router.reload()
            },3000)
          }).catch((err)=>{
            console.log(err)
            toast({
                      title: 'error while deleting this industry',
                      description: err.response?.data,
                      status: 'error',
                      isClosable: true,
                  })
          })
	}
	return(
		<Flex key={item._id} borderRadius='5' bg='#eee' gap='1' direction='column' w='180px' boxShadow={'lg'} justify='space-between'>
			<Image src={item.cover_image} alt='industry photo' h='150px' borderRadius='5'/>
			<Text p='2' fontSize='20px' fontWeight='bold'>{item?.title}</Text>
			<Text p='2'>{item?.description}</Text>
			<Flex gap='2' justify='space-between' direction='' p='2'>
					<Button bg='#009393' color='#fff' onClick={(()=>{set_is_edit_industry_Modalvisible(true)})} cursor='pointer'>Edit</Button>
					<Button color='red' border='1px solid red' cursor='pointer' onClick={handle_delete_industry}>Delete</Button>
				</Flex>
			<Edit_Industry is_edit_industry_Modalvisible={is_edit_industry_Modalvisible} set_is_edit_industry_Modalvisible={set_is_edit_industry_Modalvisible} item={item} auth_role={auth_role}/>
		</Flex>
	)
}

const Technology=({item,auth_role})=>{
	const toast = useToast();
	const router = useRouter()
	const [is_edit_technology_Modalvisible,set_is_edit_technology_Modalvisible]=useState(false);
	const payload = {
		_id: item._id,
		auth_role
	}
	const handle_delete_technology=()=>{
		Delete_Technology(payload).then(()=>{
            toast({
              title: '',
              description: `${item?.title} has been deleted`,
              status: 'info',
              isClosable: true,
            });
            setTimeout(()=>{
            	router.reload()
            },3000)
          }).catch((err)=>{
            console.log(err)
            toast({
                      title: 'error while deleting this technology',
                      description: err.response?.data,
                      status: 'error',
                      isClosable: true,
                  })
          })
	}
	return(
		<Flex key={item._id} borderRadius='5' bg='#eee' gap='1' direction='column' w='180px' boxShadow={'lg'} justify='space-between'>
			<Image src={item.cover_image} alt='industry photo' h='150px' borderRadius='5'/>
			<Text p='2' fontSize='20px' fontWeight='bold'>{item.title}</Text>
			<Text p='2'>{item?.description}</Text>
			<Flex gap='2' justify='space-between' direction='' p='2'>
				<Button bg='#009393' color='#fff' onClick={(()=>{set_is_edit_technology_Modalvisible(true)})} cursor='pointer'>Edit</Button>
				<Button color='red' border='1px solid red' cursor='pointer' onClick={handle_delete_technology}>Delete</Button>
			</Flex>
			<Edit_Technology is_edit_technology_Modalvisible={is_edit_technology_Modalvisible} set_is_edit_technology_Modalvisible={set_is_edit_technology_Modalvisible} item={item} auth_role={auth_role}/>
		</Flex>
	)
}

const Vacancy=({item})=>{
	const toast = useToast()
	const [is_view_vacancy_Modalvisible,set_is_view_vacancy_Modalvisible]=useState(false);
	const payload = {
		_id: item._id
	}
	const handle_delete_vacancy=()=>{
		Delete_Vacancy(payload).then(()=>{
            toast({
              title: '',
              description: `${item?.title} has been deleted`,
              status: 'info',
              isClosable: true,
            });
          }).catch((err)=>{
            console.log(err)
            toast({
                      title: '',
                      description: 'error while deleting this career',
                      status: 'error',
                      isClosable: true,
                  })
          })
	}
	return(
		<Flex key={item._id} borderRadius='5' bg='#fff' p='2' gap='1' direction='column' boxShadow={'dark-lg'}>
			<Text fontSize='24px' fontWeight='bold'>{item.title}</Text>
			<Flex gap='2'>
				<Text fontWeight='bold'>Posted by:</Text>
				<Text>{item.company}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Requirements: </Text>
				<Text>{item.requirements}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Description: </Text>
				<Text>{item.description}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Description: </Text>
				<Text>{item.status}</Text>
			</Flex>
			<Flex gap='2'>
				<Text fontWeight='bold'>Valid_till: </Text>
				<Text>{item.valid_till}</Text>
			</Flex>
			<Flex gap='2'>
				<Button flex='1' bg='#009393' color='#fff' onClick={(()=>{set_is_view_vacancy_Modalvisible(true)})} cursor='pointer'>Edit details</Button>
				<Button flex='1' bg='#fff' border='1px solid red' color='red' onClick={handle_delete_vacancy} cursor='pointer'>Delete</Button>
			</Flex>
			<View_Vacancy is_view_vacancy_Modalvisible={is_view_vacancy_Modalvisible} set_is_view_vacancy_Modalvisible={set_is_view_vacancy_Modalvisible} item={item}/>
		</Flex>
	)
}