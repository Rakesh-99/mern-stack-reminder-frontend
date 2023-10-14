import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ViewReminders = () => {

    const [getData, setData] = useState([]);
    console.log(getData);




    // GET API :

    const fetchData = () => {
        try {
            axios.get('https://reminder-backend-8ll6.onrender.com/viewreminders/').then((res) => {
                setData(res.data);
            });
        } catch {
            alert('An error encountered while fetching the resources ');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // DELETE API :

    const deleteHandle = (id) => {



        axios.delete(`https://reminder-backend-8ll6.onrender.com/deletereminders/${id}`).then((res) => {
            alert('Reminder has been deleted from the list');
            fetchData();
        }).catch((err) => {
            alert('An error encountered while deleting the Reminder');
        });


    };


    return (

        <>
            <div className="viewProductSection">
                <h2 style={{ textAlign: 'center', color: 'grey' }}>REMINDER </h2>
                <div className="createBtnContainer">
                    <Link className='createBtn' to={'/createreminder'}>Create Reminder</Link>
                </div>
                <div className="viewProduct">
                    {
                        getData.map((getValue) => {
                            return (

                                <div className="showData shadow-md" key={getValue._id}>
                                    <div className='productTitle  view'> <h2>Title : {getValue.title}</h2></div>


                                    <div className='productDescription view'>Description : {getValue.description}</div>

                                    <div className="btns">
                                        <Link className='editBtn  bg-indigo-500 py-1 px-3 rounded-md font-semibold text-white' to={`/editreminder/${getValue._id}`}>Edit</Link>
                                        <button className='delete bg-red-500 py-1 px-3 rounded-md font-semibold text-white' onClick={() => { deleteHandle(getValue._id) }}>Delete</button>
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
