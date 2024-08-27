import { Container,Nav,Navbar,Stack } from "react-bootstrap";
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "/src/context/AuthContext.jsx"; 
import Notification from "/src/chats/Notification.jsx"
const NavBar = () => {
    const {user,logoutUser} = useContext(AuthContext)
    return <Navbar bg="dark" className="mb-5" style={{height:"5rem"}}>
    <Container>
        <h2>
            <Link to="/" className="light text-decoration-none">chat app</Link>
        </h2>
        {user&&(<span className="text-warning">logged in as {user?.name}</span>)}
        <Nav>
            <Stack direction="horizontal" gap={4}>
                {
                    user&&(<>
                       < Notification />
                          <Link onClick={() => logoutUser()} to="/login" className="light text-decoration-none">logout</Link>
                    </>)
                }
                {
                    !user&&(<>
                    <Link to="/login" className="light text-decoration-none">login</Link>
                    <Link to="/register" className="light text-decoration-none">register</Link>
                    </>)
                }
            
            </Stack>
        </Nav>
    </Container>
    </Navbar>
}
 
export default NavBar;