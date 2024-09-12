import { Button, Form, Modal } from "react-bootstrap"
import { useState, useEffect } from "react";
import { ApartmentList } from "../components/ApartmentList";

export const ProfilePage = () => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [numberOfRooms, setNumberOfRooms] = useState("");
    const _id = JSON.parse(localStorage.getItem('user'))._id

    const closeModal = () => setIsShowModal(false);
    const showModal = () => setIsShowModal(true);

    const token = localStorage.getItem('token')

    const [flats, setFlats] = useState(null)

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch(`http://localhost:8000/apartments?filter=${_id}&fields=userId`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if( JSON.stringify(flats) !=  JSON.stringify(result.docs) ){
                   setFlats(result.docs)
                }
            })
            .catch(error => console.log('error', error));
     })



    const handleSubmit = () => {
       
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("price", price);
        urlencoded.append("address", address);
        urlencoded.append("numberOfRooms", numberOfRooms);
        urlencoded.append("userId", _id);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8000/apartments", requestOptions)
          .then(response => response.text())
          .then(result => {
              console.log(result)
              setName('')
              setPrice('')
              setAddress('')
              setNumberOfRooms('')
              closeModal();
          })
          .catch(error => console.log('error', error));
        


    }

    return (
        <>
            { !token ? (<h1>Доступ закрыт </h1>) : 
            <>
            <h1>Профиль </h1>
            
            <Button variant="primary" onClick={showModal}>
                   + квартира
            </Button>   
            
            <ApartmentList items={flats ?? []}  />

{/* { "_id" : ObjectId("61a90b369f24e003548d5bdf"), "name" : "Beatiful room", "price" : 10000000, "address" : "Moscow", "numberOfRooms" : 3, "userId" : "61a8f8d9e7a29e28ec93f417", "createdAt" : ISODate("2021-12-02T18:06:46.008Z"), "updatedAt" : ISODate("2021-12-02T18:06:46.008Z") } */}

            <Modal show={isShowModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Добавление квартиры</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>

                            <Form.Group className="mb-3" controlId="formBasicName" >
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                type="text"
                                name="name"
                                placeholder="Название"    
                                value={name}       
                                onChange={ev => setName(ev.target.value)}          
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Прайс</Form.Label>
                                <Form.Control 
                                type="text"
                                placeholder="Цена" 
                                name="price"
                                value={price}
                                onChange={ev => setPrice(ev.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control 
                                type="text"
                                placeholder="Адрес" 
                                name="address"
                                value={address}
                                onChange={ev => setAddress(ev.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNumberOfRooms">
                                <Form.Label>Кол-во комнат</Form.Label>
                                <Form.Control 
                                type="text"
                                placeholder="Количество комнат" 
                                name="numberOfRooms"
                                value={numberOfRooms}
                                onChange={ev => setNumberOfRooms(ev.target.value)}
                                />
                            </Form.Group>

                            <input type="hidden" name="userId" value={_id} />

                            </Form>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Закрыть</Button>
                    <Button variant="primary" onClick={handleSubmit}>Добавить</Button>
                    </Modal.Footer>
                </Modal>


            </>
            }
            
            
        </>
    )
}