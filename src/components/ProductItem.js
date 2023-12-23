import React from 'react';
import '../App.css';
import {API_BASE_URL} from '../App';
import axios from "axios";

function ProductItem({item, fetchProducts, setAddItem, products, setProductToEdit, setEditClick}){

    async function deleteItemHandler(id){
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchProducts();
    }

    async function updateQtyHandler(id, action){
        try{
            const response = await axios.patch(`${API_BASE_URL}/updateQty/${id}`, {action});
            fetchProducts();
        }catch(error){
            console.log(error);
        }      
    }

    async function editItemHandler(id){
        try{
            setAddItem(true);
            setEditClick(true);
            const itemToEdit = products.filter((obj) => obj.productId === id);
            setProductToEdit(itemToEdit[0]);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='product'>
            <div className='product-name'>{item.productName}</div>
            <div className='product-details'>
                <span className='width'>Id {item.productId}</span>
                <span className='width'>Price {item.price}</span>
                <span className='qty width'>
                <span>Quantity</span>
                <span onClick={() => updateQtyHandler(item.productId, 'inc')} className='signs'>+</span>
                <span>{item.quantity}</span>
                <span onClick={() => updateQtyHandler(item.productId, 'dec')} className='signs'>-</span>
                </span> 
                <span className='product-btns'>
                <span onClick={() => editItemHandler(item.productId)} className='edit'>Edit</span> 
                <span onClick={() => deleteItemHandler(item.productId)} className='delete'>Delete</span>  
                </span>  
            </div>
        </div>
    )
}

export default ProductItem;