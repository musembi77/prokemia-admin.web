import React,{useState} from 'react'
import {Flex, Text,Button,Stack,Divider} from '@chakra-ui/react'
import {Menu,Close,Add,HorizontalRule,ArrowForward,Settings,Groups,Tune,Widgets,FactCheck,Inventory} from '@mui/icons-material';
import {useRouter} from 'next/router'

function Header(){
	const [showmenubar,setshowmenubar]=useState(false);
	const router = useRouter();
	return(
		<Flex cursor='pointer' bg='#eee' fontFamily='ClearSans-Bold' h='70px' p='2' justify='space-between' align='center'>
			<Text onClick={(()=>{router.push('/dashboard')})} fontSize='28px' color='#00e0c6' fontweight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
			<Flex align='center' gap='2'>
				<Button onClick={(()=>{router.push('/Auth')})} bg='#009393' color='#fff' >Logout</Button>
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
		title:'Dashboard',
		link:'dashboard',
		logo:<Widgets/>
	},
	{
		title:'Verification',
		link:'verification',
		logo:<FactCheck/>
	},
	{
		title:'Inventory',
		link:'inventory',
		logo:<Inventory/>
	},
	{
		title:'Distributors',
		link:'distributors',
		logo:<Groups/>
	},
	{
		title:'Salespersons',
		link:'salespersons',
		logo:<Groups/>
	},
	{
		title:'Manufacturers',
		link:'manufacturers',
		logo:<Groups/>
	},
	{
		title:'Customers',
		link:'customers',
		logo:<Groups/>
	},
	{
		title:'Control',
		link:'controls',
		logo:<Tune/>
	},
	{
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
		<Flex direction='column' gap='3' p='4' w='60vw' h='90vh' bg='#009393' position='absolute' top='70px' right='0px' zIndex='2' >
			{navigation.map((item)=>{
				return(
					<Flex key={item.id} align='center' justify='space-between' borderBottom='1px solid #000'>
						<Text color='#fff' p='2' fontSize='20px'  mb='0' onClick={(()=>{router.push(`/${item.link}`)})} >{item.title}</Text>
						{item.logo}
					</Flex>
				)
			})}
		</Flex>
	)
}
