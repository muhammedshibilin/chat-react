import { useContext } from "react";
import { Form, Col, Row, Button, Stack, Alert } from "react-bootstrap";
import { AuthContext } from "/src/context/AuthContext.jsx"; 

const Login = () => {
  const {
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "1rem",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>login</h2>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({...loginInfo,email:e.target.value})} />
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo,password:e.target.value})} />
              <Button variant='success' type='submit'>{isLoginLoading?"creating your account":"Login"}</Button>              
                {loginError?.error&&<Alert>{loginError?.message}</Alert>}   
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
