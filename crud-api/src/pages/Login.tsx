import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { postData } from "../services/axios.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successToast } from "../services/toastify.service";

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    let data = { email, password };
    const response = await postData("users/login", data);
    if (response && response.status) {
      //setting jwt token and login status in local storage after login
      localStorage.setItem("IsLoggedIn", "true");
      localStorage.setItem("jwt", response.data.jwt);
      successToast(response.message);
      navigate("/home");
    }
  };
  const registerHandler = (e: any) => {
    e.preventDefault();
    navigate("/signup");
  };
  return (
    <>
      <Card className="container w-25 ">
        <Form className="mb-3 mt-2" onSubmit={(e) => submitHandler(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <button
            className="btn btn-info ms-4"
            onClick={(e) => registerHandler(e)}
          >
            Signup
          </button>
        </Form>
      </Card>
    </>
  );
};

export default login;
