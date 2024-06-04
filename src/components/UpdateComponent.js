import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import config from '../utils/config';

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

     let token = localStorage.getItem('token')
        try {
            token = token ? `bearer ${JSON.parse(token)}` : null;
        } catch (error) {
          console.error("Error parsing JSON token:", error);
        }

    useEffect(() => {
        getProductDetails();
    }, [])



    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`${config.URL}product/${params.id}`,{
             headers:{ authorization:token }
        });
       let res = await result.json();
       if (result?.status && result.status < 202) {
        setName(res.name);
        setPrice(res.price);
        setCategory(res.category);
        setCompnay(res.company)
       }else{
         alert(res?.result.toString())
       }
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
         const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${config.URL}product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company, userId}),
            headers: {
                 'Content-Type': 'Application/json',
                 authorization:token,
            }
        });
       let res = await result.json();
       if (result?.status && result.status < 202) {
        navigate('/')
       }else{
         alert(res?.result.toString())
       }

    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;