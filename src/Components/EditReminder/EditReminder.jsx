import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const EditReminder = () => {


    const [getProduct, setProduct] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        ratings: '',
        thumbnail: ''
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
        axios.get(`http://localhost:8000/products/${id}`).then((res) => {
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
        axios.patch(`http://localhost:8000/products/${id}`, getProduct).then((res) => {
            alert('The Product has been updated ');
        }).catch((err) => {
            alert(`An error occurred while updating the product~${err}`);
        });

        setProduct({
            title: '',
            description: '',
            category: '',
            price: '',
            ratings: '',
            thumbnail: ''
        })
    };

    // ---------------------------------------------------------------------------------------------------


    return (

        <>
            <div className="formController" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                <form action="">
                    <h1 style={{ marginTop: '3rem' }}>Update Product</h1>
                    <div className="formContainer">

                        <div className="sectionOne">

                            <label htmlFor="">Title</label><br />
                            <input type="text" placeholder='Product Name' autoComplete='off' name='title' value={getProduct.title} onChange={changeHandle} required /> <br />

                            <label htmlFor="">Description</label><br />
                            <input type="text" placeholder='About Product' autoComplete='off' name='description' value={getProduct.description} onChange={changeHandle} required /><br />

                            <label htmlFor="">Category</label><br />
                            <select name="category" id="" className='category' value={getProduct.category} onChange={changeHandle} required><br />
                                <option value="Choose">Choose...</option>
                                <option value="SmartPhone">SmartPhone</option>
                                <option value="Laptop">Laptop</option>
                            </select><br />
                        </div>

                        <div className="sectionTwo">

                            <label htmlFor="">Price</label><br />
                            <input type="number" placeholder='Amount' autoComplete='off' name='price' value={getProduct.price} onChange={changeHandle} required /><br />

                            <label htmlFor="">Rating</label><br />
                            <input type="number" placeholder='Product Rating' autoComplete='off' name='ratings' value={getProduct.ratings} onChange={changeHandle} required /><br />

                            <label htmlFor="">Thumbnail</label><br />
                            <input type="text" placeholder='Image link / Src' autoComplete='off' name='thumbnail' value={getProduct.thumbnail} onChange={changeHandle} required />
                            <button type='button' className='addBtn' onClick={updateProduct}>Update</button><br /><br />
                            <Link to={'/'} className='editBackButton' style={{ textDecoration: 'none', color: '#fff' }}>Back</Link>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default EditReminder;
