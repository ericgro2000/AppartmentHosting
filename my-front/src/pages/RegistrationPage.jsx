import { Form, Button } from "react-bootstrap"
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const RegistrationPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const validate = () => {
        if(!name || !email || !password || !passwordConfirm){
            alert('Заполните все поля!')
            return false;
        }
        if(password != passwordConfirm){
            alert('Пароли должны быть одинаковы!')
            return false;
        }

        return true;
    }
    const handleSubmit = () => {
        if( !validate() ) return;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Accept-Language", "en");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8000/register", requestOptions)
          .then(response => response.text())
          .then(result => {

/*{"token":"4fcf3f78138f61fe6273dbd1d6c05f15e30496d7a085919bbcdcf11f271dcecfb564cd09ae8877ede8f0b29ede2a1cbfd75d47b1100126461d5724e60a54a483d73c8dca01cd3d469003240e05563cf797542a6635638b6aa7f87050760718295e52ef5c4877a32b95fbc699fddb36e4e2ce71f2afca277538c206e42720d20fc9f8df00d57ca6c01a16441515bf7ef43607afcb2d4b95a153ccbde416d0586bcba1f454eabb3566fcc27d081afba2ffa8b622cf4f088b9ac8dcdece6a2f7ca7","user":{"_id":"61a8ef16e7a29e28ec93f404","name":"qwerty","email":"qwerty@qwerty.qwerty","role":"user","verified":false,"verification":"9097dfa8-849d-4156-9d03-ff5829642efa"}}*/

                result = JSON.parse(result)
                if( 'token' in result ){
                    let token = result.token; 
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify({
                        "name": result.user.name,
                        "email": result.user.email,
                        "_id": result.user._id,
                    }));

                    let verification = result.user.verification; 
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                    var urlencoded = new URLSearchParams();
                    urlencoded.append("id", verification);
                    console.log(verification)

                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                    };

                    fetch("http://localhost:8000/verify", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        navigate('/')

                    })
                    .catch(error => console.log('error', error));
                }


          })
          .catch(error => console.log('error', error));



    }

    return (
        <>
            <h1>Регистрация </h1>
            
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control 
                       type="text"
                       name="name"
                       placeholder="Имя арендатора"
                       value={name}
                       onChange={ev => setName(ev.target.value)}
                     />              
                </Form.Group>

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
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Подтверждение пароля</Form.Label>
                    <Form.Control 
                     type="password"
                     placeholder="Пароль" 
                     name="passwordConfirm"
                     value={passwordConfirm}
                     onChange={ev => setPasswordConfirm(ev.target.value)}
                     />
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Зарегистрироваться
                </Button>
                </Form>
        </>
    )
}