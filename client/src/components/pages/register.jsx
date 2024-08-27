import {Form,Alert,Button,Row,Col,Stack} from 'react-bootstrap'
import { useContext } from 'react'
import { AuthContext } from "/src/context/AuthContext"; 


const Register = () => {
    const {registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading} = useContext(AuthContext)
    return( <>
    <Form onSubmit={registerUser}>
        <Row
        style={{
            height:"100vh",
            justifyContent:"center",
            paddingTop:"1rem"
        }}>
            <Col xs={6}>
            <Stack gap={3}>
                <h2 >register</h2>
                <Form.Control
                type="text"
                placeholder="Name"
                value={registerInfo.name}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                value={registerInfo.email}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerInfo.password}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, password: e.target.value })
                }
              />
                <Button variant='success' type='submit'>{isRegisterLoading?"creating your account":"register"}</Button>
                {registerError && registerError.error && (
                <Alert variant="danger">
                  {registerError?.message}
                </Alert>
              )}
            </Stack>
            </Col>
        </Row>
    </Form>
    </>)
}

export default Register