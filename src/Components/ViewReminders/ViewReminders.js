import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';


const ViewReminders = () => {

    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);




    // GET API :

    const fetchData = () => {
        try {
            setLoading(true);
            axios.get('https://reminder-backend-8ll6.onrender.com/viewreminders/').then((res) => {
                setData(res?.data);
                setLoading(false);
            });
        } catch {
            alert('An error encountered while fetching the resources ');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // DELETE API :

    const deleteHandle = (id) => {
        setLoading(true);
        axios.delete(`https://reminder-backend-8ll6.onrender.com/deletereminders/${id}`).then((res) => {
            setLoading(false);
            toast.success('Reminder has been deleted from the list');
            fetchData();
        }).catch((err) => {
            setLoading(false);
            toast.success('An error encountered while deleting the Reminder');
        });


    };


    return (
        <>
            <Navbar />
            <div className="viewProductSection px-10">
                <div className="createBtnContainer text-center py-10">
                    <Link className='createBtn px-2 bg-green-600 text-white rounded-md py-2 ' to={'/createreminder'}>Create Reminder</Link>
                </div>
                <div className="viewProduct grid  grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
                    {
                        loading === true ? <div className='w-full h-screen items-center justify-center '> Loading the data from server...<Spinner /> </div> :
                            getData && getData.map((getValue) => {
                                return (

                                    <div className="showData hover:scale-105 transition-all shadow-xl shadow-violet-300 py-7 px-3 space-y-3" key={getValue._id} >
                                        <div className='productTitle  view'> <h2 className='font-semibold'>Title : {getValue?.title}</h2></div>


                                        <div className='productDescription view'>Description : {getValue?.description}</div>

                                        <div className="btns space-x-3">
                                            <Link className='editBtn  bg-indigo-500 py-1 px-5 rounded-md font-semibold text-white' to={`/editreminders/${getValue._id}`}>Edit</Link>
                                            <button className='delete bg-red-500 py-1 px-3 rounded-md font-semibold text-white' onClick={() => { deleteHandle(getValue._id) }}>{loading === true ? <p>Deleting... <Spinner /></p> : <>Delete</>}</button>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default ViewReminders;
