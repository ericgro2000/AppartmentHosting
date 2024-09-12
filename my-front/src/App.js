// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {Link, Outlet} from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav, 
  Modal,
  Button,
  Form
} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = () => setIsShowModal(false);
  const showModal = () => setIsShowModal(true);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if( token ){
      setAuth(true)
    } else {
      setAuth(false)
    }
  });

  const handleLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/');
  }

  const handleSubmit = () => {


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if( 'errors' in result ){
          alert('Не получилось...')
        } else {
          let token = result.token; 
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({
              "name": result.user.name,
              "email": result.user.email,
              "_id": result.user._id,
          }));
          closeModal();
          navigate('/');
        }
      })
      .catch(error => console.log('error', error));

    
  }

  return (
    <div className="App">
      <Navbar bg="light" variant="light" >
        <Container>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Главная</Link>
            {/* <Link to="/apartment/1" className="nav-link">Квартира 1</Link> */}
          </Nav>
          <Nav className="justify-content-end">
            { !isAuth ? (<>
            <Link to="/registration" className="nav-link">Регистрация</Link>
            <Nav.Link href="#" onClick={showModal}>Войти</Nav.Link>
            </>) : (<>
            <Link to="/profile" className="nav-link">Профиль</Link>
            <Nav.Link href="#" onClick={handleLogout}>Выход</Nav.Link>
            </>)
            }
          </Nav>
        </Container>
      </Navbar>

      <Container>
          <Outlet />
      </Container>

      <Modal show={isShowModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Вход</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                     type="email"
                     name="email"
                     placeholder="Enter"    
                     value={email}       
                     onChange={ev => setEmail(ev.target.value)}          
                     />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control 
                     type="password"
                     placeholder="Пароль" 
                     name="password"
                     value={password}
                     onChange={ev => setPassword(ev.target.value)}
                     />
                </Form.Group>

                </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Закрыть</Button>
          <Button variant="primary" onClick={handleSubmit}>Войти</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
