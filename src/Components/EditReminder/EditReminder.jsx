import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const EditReminder = () => {


    const [getProduct, setProduct] = useState({
        title: '',
        description: '',

    });

    const changeHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProduct({
            ...getProduct,
            [name]: value
        });
    };


    //--------------------------------------------------------------------------------




    // GET API for getting particular product data for prefilled form : -------------------------------------------------------

    const { id } = useParams();
    console.log('id', id);

    const getProductValue = () => {
        axios.get(`https://reminder-backend-8ll6.onrender.com/editreminders/${id}`).then((res) => {
            setProduct(res.data);
        }).catch((err) => {
            alert('An error encountered while fetching the resources - ' + err);
        })
    };

    useEffect(() => {
        getProductValue();
    }, []);

    //----------------------------------------------------------------------------------------------------





    // PATCH REQUEST For updating the Product : 



    const updateProduct = () => {
        axios.patch(`https://reminder-backend-8ll6.onrender.com/editreminders/${id}`, getProduct).then((res) => {
            alert('The Product has been updated ');
        }).catch((err) => {
            alert(`An error occurred while updating the product~${err}`);
        });

        setProduct({
            title: '',
            description: '',
        })
    };

    // ---------------------------------------------------------------------------------------------------


    return (

        <>
            <div className="formController" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <form action="">
                    <h1 className='text-2xl mb-10 font-semibold'>Update Reminder</h1>
                    <div className="formContainer">

                        <div className="sectionOne space-y-2">

                            <label htmlFor="">Reminder title</label><br />
                            <input type="text" placeholder='Reminder title' autoComplete='off' name='title' value={getProduct.title} onChange={changeHandle} className='w-80 rounded-sm px-3 py-2 border' required /> <br />

                            <label htmlFor="">Reminder description</label><br />
                            <input type="text" className='w-80 rounded-sm px-3 py-2 border' placeholder='Reminder description' autoComplete='off' name='description' value={getProduct.description} onChange={changeHandle} required /><br />


                        </div>

                        <div className="sectionTwo">

                            <button type='button' className='addBtn w-80 bg-indigo-700 text-white rounded-md py-2 mt-5' onClick={updateProduct}>Update</button><br /><br />
                            <Link to={'/'} className='editBackButton bg-green-600 text-white py-1 px-10 rounded-md'> {'<- '} Back</Link>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default EditReminder;
