import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../utils/config';

const ProductList = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);


       let token = localStorage.getItem('token')
        try {
            token = token ? `bearer ${JSON.parse(token)}` : null;
        } catch (error) {
          console.error("Error parsing JSON token:", error);
        }

    const logout = () => {
        localStorage.clear();
        alert('Unauthorized')
        navigate('/login')
    }
    

    
    const getProducts = async () => {
        try {
        let result = await fetch(`${config.URL}products`,{
            headers:{ authorization:token }});
            
       if (!result.ok) {
        // Handle server errors
        if (result.status === 404) {
          throw new Error('Resource not found');
        } else if (result.status === 401) { logout()
        } else if (result.status === 500) {
          throw new Error('Internal Server Error');
        } else {
          throw new Error('Failed to fetch data');
        }
      }

       let res = await result.json();
       setProducts(res);     
        } catch (error) {
            alert(error);   
        }   
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`${config.URL}product/${id}`, {
            method: "Delete",
            headers:{ authorization:token } 
        });
       let res = await result.json();
       if (result?.status && result.status < 202) {
        getProducts();
       }else{
         alert(res?.result.toString())
       } 
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`${config.URL}search/${key}`,{
                 headers:{ authorization:token }
            });
          let res = await result.json();
          if (result?.status && result.status < 202) {
          setProducts(res)
       }else{
         alert(res?.result.toString())
       }
        }else{
            getProducts();
        }
        
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
             <div className='mainDiv'>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link style={{marginLeft: "5px",}} to={"/update/"+item._id} >Update </Link>
                        </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
            </div>
        </div>
    )
}

export default ProductList;