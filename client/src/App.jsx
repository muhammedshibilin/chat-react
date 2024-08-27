import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Chat from "./components/pages/chat";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/navbar";
import { AuthContext } from "/src/context/AuthContext.jsx"; // Adjust path as per your project structure
import { ChatContextProvider } from "/src/context/ChatContext.jsx"; // Adjust path as per your project structure

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ChatContextProvider user={user}>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={user ? <Chat /> : <Login />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/register" element={user ? <Chat /> : <Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </>
  );
}

export default App;
