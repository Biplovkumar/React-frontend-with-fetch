import React from 'react';
import { useNavigate } from 'react-router-dom'
import config from '../utils/config'


const AddProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);

    let token = localStorage.getItem('token')
        try {
            token = token ? `bearer ${JSON.parse(token)}` : null;
        } catch (error) {
          console.error("Error parsing JSON token:", error);
        }

    const addProduct = async () => {

        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${config.URL}add-product`, {
            method: 'Post',
            body: JSON.stringify({ name, price, category, company,userId }),
            headers: {
                 'Content-Type': 'Application/json',
                 authorization:token,
            }
        });
       let res = await result.json();
       if (result?.status && result.status < 300) {
        navigate('/')
       }else{
         alert(res?.result.toString())
       }
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>} 

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;