import { ApartmentList } from '../components/ApartmentList';
import {useEffect, useState} from 'react'
import defaultApartments from '../mock/apartment.json'

export const Homepage = () => {

    const [flats, setFlats] = useState(null)

    useEffect(() => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };
    
            fetch("http://localhost:8000/apartments/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if( JSON.stringify(flats) !=  JSON.stringify(result) ){
                   setFlats(result)
                }
            })
            .catch(error => console.log('error', error));
     })

    return (
        <>
            <h1>Каталог</h1>
            <ApartmentList items={flats ?? []}  />
        </>
    )
}
