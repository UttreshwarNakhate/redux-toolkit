import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSclice";
import { STATUSES } from "../store/productSclice";
import { RingLoader } from "react-spinners";

const Products = (props) => {
  // const [products, setPrducts] = useState([]);
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   console.log(data);
    //   setPrducts(data);
    // };
    // fetchProducts();
  }, []);
  console.log("props: ", props);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <div className="loaderWrapper">
      <RingLoader  color="#3f4141"
    size={150}/>
    </div>;
  }
  if (status === STATUSES.ERROR) {
    return <h1 className="error">Something went wrong!</h1>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
