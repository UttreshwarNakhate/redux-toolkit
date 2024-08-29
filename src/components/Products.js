import { useState, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { add } from "../store/cartSlice";

const Products = (props) => {
  const [products, setPrducts] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      console.log(data);
      setPrducts(data);
    };
    fetchProducts();
  }, []);
  console.log("props: ", props);

  const handleAdd = (product) => {
    dispatch(add(product))

  };

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={()=>handleAdd(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
