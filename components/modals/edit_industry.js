import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Flex,
    Center,
    Textarea,
    Input,
    Select,
    Image,
    InputGroup,Heading,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import Edit_Industry from '../../pages/api/controls/edit_industry';
import {storage} from '../firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import Cookies from 'universal-cookie';
import DoneIcon from '@mui/icons-material/Done';


function Edit_Industry_Modal({
    is_edit_industry_Modalvisible,
    set_is_edit_industry_Modalvisible,
    item,
  }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cookies = new Cookies();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(is_edit_industry_Modalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        set_is_edit_industry_Modalvisible(false)
      }
    }

    const [edited_title,set_edited_title]=useState(item?.title);
    const [edited_description,set_edited_description]=useState(item?.description);

    const [is_edit,set_is_edit]=useState(false);
    const [is_change_image,set_is_change_image]=useState(false);
    const [image,set_image]=useState('')
    const [image_url,set_image_url]=useState(item?.cover_image);
    const [image_uploaded,set_image_uploaded]=useState(false);
    const [is_submitting,set_is_submitting]=useState(false);
    const [is_retry,set_is_retry]=useState(false);

    useEffect(()=>{
      HandleModalOpen();
    },[is_edit_industry_Modalvisible])

    
    const payload = {
    	_id: item?._id,
    	title:edited_title,
        description: edited_description,
        cover_image: image_url
    }

    const handle_image_upload=async()=>{
      if (image.name == undefined){
        return alert('could not process image, try again.')
      }else{
        console.log(image.name)
        const image_documentRef = ref(storage, `industry_images/${image?.name + v4()}`);
        const snapshot= await uploadBytes(image_documentRef,image)
        set_image_uploaded(true)
        const file_url = await getDownloadURL(snapshot.ref)
        cookies.set('ind_image_url', file_url, { path: '/' });
        set_image_url(file_url)
        return file_url
      }
    }

    const Upload_File=async()=>{
      set_is_submitting(true)
        if (image !== '' || item?.title !== edited_title){
            set_image_url('')
            console.log('1')
            await handle_image_upload().then(()=>{
                handle_edit_industry()
            })
            return ;
        }
        if ((image == '' && edited_title !== item?.title) || (image == '' && edited_description !== item?.description)){
            console.log('2')
            await Edit_Industry(payload).then(()=>{
                alert(`${payload.title} has been edited successfuly`)
            })
            set_is_submitting(false)
            set_is_retry(false)
            onClose()
            return;
        }
    }

    const handle_edit_industry=async()=>{
        if ((image !== '' && edited_title !== item?.title) || (image !== '' && edited_description !== item?.description)){
            await Edit_Industry(payload).then(()=>{
                alert(`${payload.title} has been edited successfuly`)
            })
            return;
        }
        console.log(payload)
        if (image_url == '' ){
            console.log('3')
            set_image_url(cookies.get("ind_image_url"))
            set_is_retry(true)
            return ;
        }else{
            console.log('4')
            await Edit_Industry(payload).then(()=>{
                alert(`${payload.title} has been edited successfuly`)
            })
            set_is_submitting(false)
            set_is_retry(false)
            onClose()
            return;
        }
    }

    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='32px'>Edit Industry</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
                            {is_edit?
    							<Flex direction='column' gap='2'>
                                    <Text>Industry title</Text>
                                    <Input type='text' placeholder={edited_title} variant='filled' onChange={((e)=>{set_edited_title(e.target.value)})}/>
                                    <Text>Description</Text>
                                    <Input type='text' placeholder={edited_description} variant='filled' onChange={((e)=>{set_edited_description(e.target.value)})}/>
                                    <Flex direction='column'>
                                      <Text>Select an image to edit cover photo</Text>
                                        {is_change_image || item?.cover_image == ''?
                                            <>
                                            {image_uploaded?
                                                <Uploaded name={image.name}/>
                                                :
                                                <Input type='file' accept='.jpeg,.jpg,.png' placeholder='Industry_image_cover' variant='filled' onChange={((e)=>{set_image(e.target.files[0])})}/>
                                            }
                                            </>
                                        :
                                            <Button onClick={(()=>{set_image_uploaded(false); set_is_change_image(true); })}>Change Image Photo</Button>
                                        }
                                    </Flex>
                                    {is_retry?
                                        <Button bg='#000' borderRadius='0' color='#fff' onClick={handle_edit_industry}>Complete uploading</Button>
                                        :
                                        <Button bg='#009393' borderRadius='0' color='#fff' onClick={Upload_File} disabled={is_submitting?true:false}>Update changes</Button>
                                    }
    							</Flex>
                            :
                                <>
                                    <Image src={item?.cover_image} alt='industry photo' h='300px' w='100%' objectFit='cover'/>
                                    <Text fontSize='20px' fontWeight='bold'>{item?.title}</Text>
                                    <Text fontSize='14px' >{item?.description}</Text>
                                    <Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_is_edit(true)})}>Edit_Industry</Button>
                                </>
                            }
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default Edit_Industry_Modal;

const Uploaded=({name})=>{
  return(
    <Flex boxShadow='lg' borderRadius='5' p='2' borderRight='2px solid green'>
      <Text w='100%' >{name} uploaded</Text>
      <DoneIcon style={{color:"green"}}/>
    </Flex>
  )
}