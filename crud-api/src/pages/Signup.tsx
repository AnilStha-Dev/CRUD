import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { postData } from '../services/axios.service';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { successToast } from '../services/toastify.service';

const Signup = () => {
    const navigate=useNavigate();
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const submitHandler= async(e:any)=>{
        e.preventDefault();
        let data={email, password}
        const response=await postData("users/register",data);
        if(response&&response.status){   
          successToast(response.message)
            navigate("/");
        }
        
        
    }
  return (
   <>
   <Card className='container w-25 '>
   <Form className='mb-3 mt-2' onSubmit={(e)=>submitHandler(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Register 
      </Button>
    </Form >
   </Card>
    
   </>
  )
}

export default Signup