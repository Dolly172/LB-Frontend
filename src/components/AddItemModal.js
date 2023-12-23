import React,{useState} from "react";
import '../App.css';
import {API_BASE_URL} from '../App';
import axios from "axios";

function AddItemModal({ productToEdit, fetchProducts, setItem, item, setAddItem,setEditClick, editClick}){

  function closeModalHandler(e){
    setAddItem(false);
  }

  function inputHandler(e){
     const {name, value} = e.target;
     setItem((prev) => ({
      ...prev,
      [name]: value
     }))
  }

  async function submitHandler(){
    try{
      if(editClick) {
        const id = productToEdit.productId;
        const filteredObj = Object.fromEntries(
          Object.entries(item).filter(([key, value]) => value.trim() !== '')
        );
        const updatedObj = Object.assign(productToEdit, filteredObj);
        const response = await axios.put(`${API_BASE_URL}/updateProduct/${id}`, updatedObj);
        fetchProducts();
        setAddItem(false);
        setEditClick(false);
        setItem({
          productId: "",
          productName: "",
          price: "",
          quantity: ""
        });
      } else {
      const response = await axios.post(API_BASE_URL, item);
      fetchProducts();
      setAddItem(false);
      setItem({
        productId: "",
        productName: "",
        price: "",
        quantity: ""
      });
      }
      
    } catch(error){
      console.log(error);
      alert("product already exists");
      
    }
    
  }

    return(
        <div className="modal-container" onClick={closeModalHandler}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div>
                Product Id
                <input name="productId" defaultValue={editClick ? productToEdit.productId : item.productId} onChange={(e) => inputHandler(e)} type="number" placeholder="Product Id"></input>
            </div>
            <div>
                Product Name
                <input name="productName" defaultValue={editClick ? productToEdit.productName : item.productName} onChange={(e) => inputHandler(e)} type="text" placeholder="Product Name"></input>
            </div>
            <div>
                Price
                <input name="price" defaultValue={editClick ? productToEdit.price : item.price} onChange={(e) => inputHandler(e)} type="number" placeholder="Price"></input>
            </div>
            <div>
                Quantity
                <input name="quantity" defaultValue={editClick ? productToEdit.quantity : item.quantity} onChange={(e) => inputHandler(e)} type="number" placeholder="Quantity"></input>
            </div>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>
    )
}

export default AddItemModal;