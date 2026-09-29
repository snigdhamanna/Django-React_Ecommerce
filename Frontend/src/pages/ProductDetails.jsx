
import { Link, useParams } from 'react-router-dom'
import { useCart} from "../context/CartContext";
import React, { useState, useEffect } from 'react';

function ProductDetails () {
  const {id} =useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);



   if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

    const handleAddToCart = () => {
    addToCart(product.id);
  }

  

  if (error) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }



    if (!product) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h3>No product found</h3>
      </div>
    );
  }




  

  
return (


  <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center py-5 mt-5" >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            
           
            <div className="card shadow border-0 rounded-4 p-4 p-md-5 bg-white">
              <div className="row g-4 align-items-center">
               
                <div className="col-12 col-md-6">
                  <img
                    src={`${BASEURL}${product.image}`}
                    alt={product.name}
                    className="img-fluid rounded-3 object-fit-cover w-100"
                    style={{ maxHeight: "400px" }}
            
                  />
                </div>

        
                <div className="col-12 col-md-6">
                  <h1 className="fw-bold text-dark mb-2 display-6">
                    {product.name}
                  </h1>
                  <p className="text-muted mb-4 fs-6">
                    {product.description}
                  </p>
                  <p className="text-success fw-semibold fs-3 mb-4">
                    \${product.price}
                  </p>

                    <button onClick={handleAddToCart} className="btn btn-primary px-4">
                      Add to Cart 🛒
                     </button>
                  
                  

                

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


)
 
  
}

export default ProductDetails