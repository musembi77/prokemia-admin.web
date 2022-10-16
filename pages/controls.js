import React from 'react';
import {Flex,Text,Button} from '@chakra-ui/react';
import Header from '../components/Header.js';

function Control(){
	return(
		<Flex direction='column'>
			<Header />
			<Flex direction='column' gap='2' p='2'>
				<Text borderBottom='1px solid #009393' fontSize='20px' fontWeight='bold'>Careers</Text>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>SalesMan Needed at Haco Ltd</Text>
					<Text>3yrs experience</Text>
					<Text>Degree Required</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>SalesMan Needed at Haco Ltd</Text>
					<Text>3yrs experience</Text>
					<Text>Degree Required</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Button bg='#009393' color='#fff'>Add new Career</Button>
			</Flex>
			<Flex direction='column' gap='2' p='2'>
				<Text borderBottom='1px solid #009393' fontSize='20px' fontWeight='bold'>Industry</Text>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>Personal Care</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>Adhesives</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Button bg='#009393' color='#fff'>Add new Industry</Button>
			</Flex>
			<Flex direction='column' gap='2' p='2'>
				<Text borderBottom='1px solid #009393' fontSize='20px' fontWeight='bold'>Technology</Text>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>Pharmaceutical</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Flex borderRadius='5' bg='#eee' p='2' gap='1' direction='column'>
					<Text fontSize='18px' fontWeight='bold'>Agricultural</Text>
					<Flex gap='2'>
						<Text color='#009393'>Edit</Text>
						<Text color='red'>Delete</Text>
					</Flex>
				</Flex>
				<Button bg='#009393' color='#fff'>Add new Technology</Button>
			</Flex>
		</Flex>
	)
}

export default Control;