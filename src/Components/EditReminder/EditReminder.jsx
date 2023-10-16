import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';



const EditReminder = () => {

    const [loader, setLoader] = useState(false);

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

    const getProductValue = () => {
        setLoader(true);
        axios.get(`https://reminder-backend-8ll6.onrender.com/viewreminders/${id}`).then((res) => {
            setLoader(false);
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
        setLoader(true);
        axios.patch(`https://reminder-backend-8ll6.onrender.com/editreminders/${id}`, getProduct).then((res) => {
            setLoader(false);
            toast.success('The Product has been updated');
        }).catch((err) => {
            setLoader(false);
            toast.error('An error occurred while updating the product');
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
                    <h1>{loader === true ? <p className='font-semibold text-indigo-700'>Loading...{<Spinner />}</p> : <></>}</h1>
                    <div className="formContainer">

                        <div className="sectionOne space-y-2">

                            <label htmlFor="">Reminder title</label><br />
                            <input type="text" placeholder='Reminder title' autoComplete='off' name='title' value={getProduct.title} onChange={changeHandle} className='w-80 rounded-sm px-3 py-2 border' required /> <br />

                            <label htmlFor="">Reminder description</label><br />
                            <input type="text" className='w-80 rounded-sm px-3 py-2 border' placeholder='Reminder description' autoComplete='off' name='description' value={getProduct.description} onChange={changeHandle} required /><br />


                        </div>

                        <div className="sectionTwo">

                            <button type='button' className='addBtn w-80 bg-indigo-700 text-white rounded-md py-2 mt-5' onClick={updateProduct}>{loader === true ? <p>Updating...<Spinner /></p> : <>Update</>}</button><br /><br />
                            <Link to={'/viewreminders'} className='editBackButton bg-green-600 text-white py-1 px-10 rounded-md'> {'<- '} Back</Link>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default EditReminder;
