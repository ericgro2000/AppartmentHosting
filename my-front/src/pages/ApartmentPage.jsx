import { useParams } from "react-router"
import defaultApartments from '../mock/apartment.json'

export const ApartmentPage = () => {
    let params = useParams();

    let apartment = defaultApartments.filter( 
        item => item.id == params.apartmentId
    )[0];

    let {title, price, address} = apartment

    return (
        <>
            <h1>Квартира {params.apartmentId}</h1>
            <p>Название: {title}</p>
            <p>Цена: {price}</p>
            <p>Адрес: {address}</p>
        </>
    )
}