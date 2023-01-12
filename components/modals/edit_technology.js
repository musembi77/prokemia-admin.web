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
import Edit_Technology from '../../pages/api/controls/edit_technology';
import {storage} from '../firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import Cookies from 'universal-cookie';
import DoneIcon from '@mui/icons-material/Done';

function Edit_Technology_Modal({
    is_edit_technology_Modalvisible,
    set_is_edit_technology_Modalvisible,
    item,
  }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cookies = new Cookies();
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(is_edit_technology_Modalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        set_is_edit_technology_Modalvisible(false)
      }
    }

    const [edited_title,set_edited_title]=useState(item?.title);
    const [is_edit,set_is_edit]=useState(false);
    const [is_change_image,set_is_change_image]=useState(false);
    const [image,set_image]=useState('')
    const [image_url,set_image_url]=useState(item?.cover_image);
    const [image_uploaded,set_image_uploaded]=useState(false);
    const [is_submitting,set_is_submitting]=useState(false);
    const [is_retry,set_is_retry]=useState(false);

    useEffect(()=>{
      HandleModalOpen();
    },[is_edit_technology_Modalvisible])

    
    const payload = {
        _id: item?._id,
        title:edited_title,
        cover_image: image_url
    }

    const handle_image_upload=async()=>{
      if (image.name == undefined){
        return alert('could not process image, try again.')
      }else{
        console.log(image.name)
        const image_documentRef = ref(storage, `technology_images/${image?.name + v4()}`);
        const snapshot= await uploadBytes(image_documentRef,image)
        set_image_uploaded(true)
        const file_url = await getDownloadURL(snapshot.ref)
        cookies.set('tech_image_url', file_url, { path: '/' });
        set_image_url(file_url)
        return file_url
      }
    }

    const Upload_File=async()=>{
      set_is_submitting(true)
      await handle_image_upload().then(()=>{
        handle_edit_Technology()
      })
    }

    const handle_edit_Technology=async()=>{
        if (payload.cover_image == ''){
            set_image_url(cookies.get("tech_image_url"))
            set_is_retry(true)
        }else{
              await Edit_Technology(payload).then(()=>{
                alert(`${payload.title} has been edited successfuly`)
              })
              set_is_submitting(false)
              set_is_retry(false)
              onClose()
        }
    }
    return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Text fontSize='32px'>Edit Technology</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
                            {is_edit?
                                <Flex direction='column' gap='2'>
                                    <Text>Technology title</Text>
                                    <Input type='text' placeholder={edited_title} variant='filled' onChange={((e)=>{set_edited_title(e.target.value)})}/>
                                    <Flex direction='column'>
                                      <Text>Select a image to edit cover photo</Text>
                                        {is_change_image || item?.cover_image == ''?
                                            <>
                                            {image_uploaded?
                                                <Uploaded name={image.name}/>
                                                :
                                                <Input type='file' accept='.jpeg,.jpg,.png' placeholder='Technology_image_cover' variant='filled' onChange={((e)=>{set_image(e.target.files[0])})}/>
                                            }
                                            </>
                                        :
                                            <Button onClick={(()=>{set_is_change_image(true)})}>Change Image Photo</Button>
                                        }
                                    </Flex>
                                    {is_retry?
                                        <Button bg='#000' borderRadius='0' color='#fff' onClick={handle_edit_Technology}>Complete uploading</Button>
                                        :
                                        <Button bg='#009393' borderRadius='0' color='#fff' onClick={Upload_File} disabled={is_submitting?true:false}>Update changes</Button>
                                    }
                                </Flex>
                            :
                                <>
                                    <Image src={item?.cover_image} alt='technology photo' h='300px' w='100%' objectFit='cover'/>
                                    <Text fontSize='20px' fontWeight='bold'>{item?.title}</Text>
                                    <Button bg='#009393' borderRadius='0' color='#fff' onClick={(()=>{set_is_edit(true)})}>Edit Technology</Button>
                                </>
                            }
                        </Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
      )
}   

export default Edit_Technology_Modal;

const Uploaded=({name})=>{
  return(
    <Flex boxShadow='lg' borderRadius='5' p='2' borderRight='2px solid green'>
      <Text w='100%' >{name} uploaded</Text>
      <DoneIcon style={{color:"green"}}/>
    </Flex>
  )
}