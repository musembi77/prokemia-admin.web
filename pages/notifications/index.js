//modules imports
import React,{useState,useEffect} from 'react';
import {Flex,Text,Button,Input} from '@chakra-ui/react';
//components imports
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header.js';
//icon imports

/*page sections*/
import Products from './product/all.js'
import Distributors from './distributor/all.js'
import Manufacturers from './manufacturer/all.js'
import Salespeople from './salesperson/all.js'
import Sales from './sales.js'
import Requests from './requests.js'
import Industries from './industries.js'
import Technologies from './technologies.js'

 
export default function Page_Handler(){
	const [currentvalue,setCurrentValue] = useState('products')
	
	if (currentvalue == 'products')
	{   
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Products/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'distributors')
	{
		return(
				<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody}>
						<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Distributors/>
					</Flex>
				</Flex>
			)
	}else if (currentvalue == 'manufacturers')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Manufacturers/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'salespeople')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Salespeople/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'sales')
	{
		return(
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar  currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Sales />
				</Flex>
			</Flex>
			)
	}else if (currentvalue == 'requests')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Requests/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'industries')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Industries/>
				</Flex>
			</Flex>
		)
	}else if (currentvalue == 'technologies')
	{
		return (
			<Flex direction='column' gap='2'>
				<Header/>
				<Flex className={styles.consolebody}>
					<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
					<Technologies/>
				</Flex>
			</Flex>
		)
	}else{
		return(
			<Flex direction='column' gap='2'>
					<Header/>
					<Flex className={styles.consolebody} >
						<Navbar currentvalue={currentvalue} setCurrentValue={setCurrentValue}/>
						<Products/>
					</Flex>
			</Flex>
		)
	}
}

const navItems = [
 {
 	id:1,
	 title:'Products',
	 link:'products',
 },
 {
 	id:2,
	title:'Distributors',
	link:'distributors'
 },
 {
 	id:3,
	 title:'Manufacturers',
	 link:'manufacturers',
 },{
 	id:4,
	 title:'Salespeople',
	 link:'salespeople',
 },
 {
 	id:5,
	 title:'Sales',
	 link:'sales',
 },
 {
 	id:6,
	 title:'Requests',
	 link:'requests',
 },
  {
 	id:7,
	 title:'Industries',
	 link:'industries',
 },
  {
 	id:8,
	 title:'Technologies',
	 link:'technologies',
 }
 ]

const Navbar=({setCurrentValue,currentvalue,setActive})=>{
	return(
		<Flex p='2' gap='3' className={styles.consoleNavigation} cursor='pointer'>
			{navItems.map((content)=>{
				return (
					<Flex key={content.id} color={currentvalue === content.title.toLowerCase() ? '#009393': '#fff'} align='center' p='2' gap='3' className={styles.consoleNavItem} onClick={(()=>{setCurrentValue(content.link)})}>
						{content.icon}
						<Text fontSize='20px' p='1.5' mb='0'>{content.title}</Text>
					</Flex>
				)
			})}
		</Flex>
	)
}