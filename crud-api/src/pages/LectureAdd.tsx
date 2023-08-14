import { Formik, ErrorMessage  } from 'formik';
import { object, string, number, mixed } from 'yup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { postDataWithHeaders } from '../services/axios.service';
import { successToast } from '../services/toastify.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const LectureAdd = () => {
  const [buttonIsDesabled,setbuttonIsDesabled]=useState(false);
const navigate=useNavigate();
  //initial values for formik 
  const initialValues={
    title:"",
    content:"",
    duration:"",
    file:null,
  }

  //yup validation
  let userSchema = object({
    title: string().required("please enter title"),
    content: string().required("enter content"),
    duration: number().required("enter numbers"),
    file:mixed().required("file is required")
  });

  //handlesubmit fun
  const handleSubmit=async(values:any)=>{
    console.log("clicked");
    
    setbuttonIsDesabled(true);
    const formData=new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content); 
    formData.append("duration", values.duration);
    formData.append("video", values.file);

    //adding data by calling api post method
    const response=await postDataWithHeaders("lectures",formData)

    //if status is true then navigate to another page 
    if(response.status){
      successToast(response.message);
     navigate("/home");
    }
  }

  return (
    <>
    <div><h1>Add Lecture</h1></div>
    <Formik
       initialValues={ initialValues }
       validationSchema={userSchema}
       onSubmit={handleSubmit}
     >
       {({
         handleChange,
         handleSubmit,
         setFieldValue
       }) => (

       <Card >
         <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' name='title' onChange={handleChange} />
            <ErrorMessage name="title" className="text-danger" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control type='text' name='content' onChange={handleChange} />
            <ErrorMessage name="content" className="text-danger" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control type='text' name='duration' onChange={handleChange} />
            <ErrorMessage name="duration" className="text-danger" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>File</Form.Label>
            <Form.Control type='file' name='file' onChange={(e:any)=>{
            setFieldValue("file", e.currentTarget.files[0]);
           }} />
            <ErrorMessage name="file" className="text-danger" />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={buttonIsDesabled}>
        Add
      </Button>
        </Form>
       </Card>
        
       )}
     </Formik>
    </>
  )
}

export default LectureAdd