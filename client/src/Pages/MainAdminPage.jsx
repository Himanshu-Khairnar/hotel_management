import React,{useState} from 'react'
import RegisterHotelTable from '../Components/RegisterHotelTable'
import AddHotel from '../Components/AddHotel'

const MainAdminPage = () => {

   const [hotels, setHotels] = useState([
     {
       name: "Hotel Sunshine",
       address: {
         street: "123 Main St",
         city: "New York",
         state: "NY",
         zipCode: "10001",
       },
       logo: new Blob(), // Example placeholder
     },
   ]);

   const handleEdit = (index) => {
     alert(`Edit hotel at index: ${index}`);
     // Implement edit logic
   };

   const handleDelete = (index) => {
     setHotels((prevHotels) => prevHotels.filter((_, i) => i !== index));
   };
  return (
    <div className='h-100'>
      <AddHotel />
      <RegisterHotelTable
        hotels={hotels}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default MainAdminPage