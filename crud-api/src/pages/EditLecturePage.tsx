import { Formik, ErrorMessage  } from 'formik';
import { object, string, number, mixed } from 'yup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { getDataWithHeaders, patchDataWithHeaders } from '../services/axios.service';
import { successToast } from '../services/toastify.service';

const EditLecturePage = () => {
    const navigate=useNavigate();
    const [lecture,setLectures]=useState<any>({});
    const {id}=useParams();
    const [removeVideo, setRemoveVideo]=useState(false);

    //calling api to get value
    //get method with jwt token to fetch data of specific id
    const getLectureById=async()=>{
        const response=await getDataWithHeaders(`lectures/${id}`)
        setLectures(response);
        
    }
    //to get the data on first page load
    useEffect(()=>{
        getLectureById()
    },[]);

  let handleSubmit= async(values:any)=>{
   
     const formData:any=new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("duration",values.duration);
    console.log(values.file);
    
    if(values.file){
        formData.append("video",values.file);
        formData.append("isVideoEdited",true);
       
      }else{
        formData.append("isVideoEdited",false);
      }

      const response= await patchDataWithHeaders(`lectures/${id}`, formData);
      if(response.status){
        successToast(response.message);
        navigate("/home")
      }
    
  

  }
    
  //yup validation
  // let userSchema = object({
  //   title: string().required("please enter title"),
  //   content: string().required("enter content"),
  //   duration: number().required("enter numbers"),
  //   file:mixed().required("file is required")
  // });
  return (
    <>
    <div><h1>Edit Lecture</h1></div>
    {lecture.status?<Formik
       initialValues={{
        title:lecture.data.title,
        content:lecture.data.content,
        duration:lecture.data.duration,
        file:null,
        isVideoEdited:false,
      } }
      //  validationSchema={userSchema}
       onSubmit={handleSubmit}
     >
       {({
        values,
         handleChange,
         handleSubmit,
         setFieldValue
       }) => (

         <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' name='title' onChange={handleChange} value={values.title}/>
            <ErrorMessage name="title" className="text-danger" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control type='text' name='content' onChange={handleChange} value={values.content} />
            <ErrorMessage name="content" className="text-danger" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control type='text' name='duration' onChange={handleChange} value={values.duration} />
            <ErrorMessage name="duration" className="text-danger" />
          </Form.Group>
          {/* first display videos fetched from api and if user wants to remove it then removeVideo will run */}
          {removeVideo?<Form.Group className="mb-3" controlId="file">
            <Form.Label>File</Form.Label>
            <Form.Control type='file' name='file' onChange={(e:any)=>{
            setFieldValue("file", e.currentTarget.files[0]);
           }} />
            <ErrorMessage name="file" className="text-danger" />
          </Form.Group>: <><Box as="video" w="100%" h="300px" controls>
  <source src={lecture.data.lectureUrl} type="video/mp4" />
</Box>
<Button className='btn btn-danger me-3' onClick={(e)=>{
    e.preventDefault();
    setRemoveVideo(true)}}>Del</Button>
    </>
}
          <Button variant="primary" type="submit" >
        EDIT VDO
      </Button>
        </Form>
      
        
       )}
     </Formik>:"loading"}
    </>
  )
}

export default EditLecturePage