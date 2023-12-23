import React, { useState } from 'react';
import '../App.css';
import ProductItem from './ProductItem';
import AddItemModal from './AddItemModal';

function Products({fetchProducts, products, setProducts, item, setItem}){

    const [addItem, setAddItem] = useState(false);
    const [editClick, setEditClick] = useState(false);
    const [productToEdit, setProductToEdit] = useState();

    return(
        <div className='products-body'>
            <div className='m-40'>
            <span className='f-17'>Products</span>
            <span className='add-btn' onClick={() => setAddItem(true)}>Add Item</span>
            </div>
            <ul>
            {products.map((item) => {
               return <div key={Math.random()}>
                   <ProductItem 
                    editClick={editClick}
                    setEditClick={setEditClick} 
                    products={products} 
                    fetchProducts={fetchProducts} 
                    item={item} 
                    addItem={addItem} 
                    setAddItem={setAddItem}
                    productToEdit={productToEdit}
                    setProductToEdit={setProductToEdit}
                     />
                </div>
              
            })}
            </ul>
            {addItem && <AddItemModal 
                        editClick={editClick}
                        setEditClick={setEditClick} 
                        fetchProducts={fetchProducts} 
                        item={item} 
                        setItem={setItem} 
                        products={products} 
                        setProducts={setProducts} 
                        setAddItem={setAddItem}
                        productToEdit={productToEdit}
                        setProductToEdit={setProductToEdit} 
                        />
                        }

        </div>
    )
}

export default Products;