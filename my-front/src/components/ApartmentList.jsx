import { Apartment } from '../components/Apartment';

export  const ApartmentList = (props) => {
    const {items = []} = props;
    return (
        <div className="flats">
        {items.map( item => (
            <Apartment key={item.id} {...item} />
        ) )}
        </div>
    )
}

