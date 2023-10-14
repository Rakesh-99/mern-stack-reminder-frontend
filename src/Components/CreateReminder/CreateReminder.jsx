import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateReminder = () => {


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

    const submitHanlde = (e) => {
        e.preventDefault();

        // POST API :


        axios.post('http://localhost:8000/createreminder/', getProduct).then((res) => {
            alert('Reminder has been added to your list ');
        }).catch((errLog) => {
            alert('An error occurred while adding the Reminder' + errLog);
        });

        setProduct({
            title: '',
            description: '',
        })
    };



    return (

        <>
            <div className="container flex w-full h-screen justify-center" >

                <form action="" onSubmit={submitHanlde} className='flex flex-col space-y-3'>
                    <h1 style={{ marginTop: '3rem' }} className='text-2xl font-semibold'>Add Reminder</h1>

                    <label htmlFor="">Reminder Title: </label>

                    <input type="text" placeholder='Reminder Title' autoComplete='off' name='title' value={getProduct.title} onChange={changeHandle} required className='border py-2 px-3 rounded-sm w-96' />

                    <label htmlFor="">Reminder Description: </label>
                    <input type="text" placeholder='Reminder Description' autoComplete='off' name='description' value={getProduct.description} onChange={changeHandle} required className='border py-2 px-2 rounded-sm w-96 ' />



                    <button type='submit' className='addBtn bg-indigo-500 text-white font-semibold rounded-md py-2'>Add Reminder</button>

                    <Link to={'/'} className='addBtn bg-red-500 text-center text-white font-semibold rounded-md py-2'>Back</Link>

                </form>
            </div>

        </>
    )
}

export default CreateReminder;
