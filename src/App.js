import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import axios from 'axios';

export const API_BASE_URL = "https://lb-backend.onrender.com";

function App() {

  const [item, setItem] = useState({
    productId: "",
    productName: "",
    price: "",
    quantity: ""
  })

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(){
    try{
      const response = await axios.get(API_BASE_URL, { crossdomain: true });
      console.log(response);
      setProducts(response.data);
    }catch(error){
      console.error('Error fetching products:', error);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Products fetchProducts={fetchProducts} item={item} setItem={setItem} products={products} setProducts={setProducts}/>
    </div>
  );
}

export default App;
