import {
    Card    
}  from 'react-bootstrap'
import { Link } from 'react-router-dom';

export  const Apartment = (props) => {

    const {
       _id,
       title,
       city,
       address,
       rooms,
       price,
       description,
       image
    } = props;

    return (
        <>
        <Card style={{ width: '15.5rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            {description} <hr /> {address}
            </Card.Text>
            <Link to={`/apartment/${_id}`} className="btn btn-primary">
                Подробней
            </Link>
        </Card.Body>
        </Card>
        </>
    )
}