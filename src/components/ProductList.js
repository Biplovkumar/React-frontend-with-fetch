import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../utils/config';

const ProductList = () => {
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

    const getProducts = async () => {
        let result = await fetch(`${config.URL}products`,{
            headers:{ authorization:token }
        });
        let res = await result.json();
       if (result?.status && result.status < 300) {
         setProducts(res);
       }else{
         alert(res?.result.toString())
       }      
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`${config.URL}product/${id}`, {
            method: "Delete",
            headers:{ authorization:token } 
        });
       let res = await result.json();
       if (result?.status && result.status < 300) {
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
          if (result?.status && result.status < 300) {
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
    )
}

export default ProductList;