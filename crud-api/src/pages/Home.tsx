import { useEffect, useState } from "react";
import { deleteData, getData } from "../services/axios.service"
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Button, Heading , Stack, Text,  ButtonGroup, Divider,Box } from '@chakra-ui/react'
import { successToast } from "../services/toastify.service";


const Home = () => {
  const navigate=useNavigate();
  const [lectures, setLectures]=useState([]);
  
  
  const getLectures=async()=>{
    const response=await getData("lectures"); 
    if(response.status){
      setLectures(response.data);
    }
    
  }
  //we use useEffect here to initiate the data fetching process as soon as the components mounts
  //suru ma data chaiyo so useEffect use garne yo data navae tala componen ma data render hudaina
  useEffect(()=>{
    getLectures();
  },[]);
   
  //delete
  const deleteHandler=async(e:any,id:string)=>{
    e.preventDefault();
    const response=await deleteData(`lectures/${id}`)
    if(response.status){      
      const filterData=lectures.filter((lec:LectureInterface)=>{
        return lec._id!==id;
      })
      setLectures(filterData);
      successToast(response.message);
    }
  }

  //add
  const addHandler=(e:Event)=>{
    e.preventDefault();
    navigate("/home/add")
    

  }

  //edit page ma lagne
  const navigateEdit=(e:any,id:string)=>{
    e.preventDefault();
    navigate(`/home/${id}`)
  }
  return (
    <>
 <Button colorScheme='teal' variant='solid' w="3xs" onClick={(e:any)=>addHandler(e)}>
    Add
  </Button>
    <div className=" container mt-4 d-flex flex-wrap gap-4">
    {lectures.map((lecture:LectureInterface)=>{
      return (<Card className="bg-info" width={"400px"} key={lecture._id}>
      <CardBody>
      <Box as="video" w="100%" h="300px" controls>
  <source src={lecture.lectureUrl} type="video/mp4" />
</Box>
        <Stack  spacing='2' className="mt-4" >
          <Heading size='md'>{lecture.title}</Heading>
          <Text>
            {lecture.content}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            {lecture.duration} min
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' onClick={(e:any)=>navigateEdit(e, lecture._id)}>
            Edit
          </Button>
          <Button variant='solid' colorScheme='red' onClick={(e:any)=>deleteHandler(e,lecture._id)}>
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>);
    })}
    </div>
    
    </>
  )
}

export default Home

 