import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
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
  }, [id, BASEURL]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="alert alert-danger m-4">Error: {error}</div>;
  }
  if (!product) {
    return <div className="alert alert-warning m-4">No product found</div>;
  }

  const handleAddToCart = () => {
    if(!localStorage.getItem('access_token')){
      window.location.href = '/login';
      return;
    }
    addToCart(product.id);
  }
  return (
    <div className="container py-4">
      <div className="col-lg-9 mx-auto">
        <div className="card shadow border-0 rounded-4 p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <img
                src={`${product.image}`}
                alt={product.name}
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-6">
              <h1 className="fw-bold mb-2">{product.name}</h1>
              <p className="text-secondary mb-3">{product.description}</p>
              <p className="fs-2 fw-semibold text-success mb-4">
                {product.price}
              </p>
              <button onClick={handleAddToCart} className="btn btn-primary px-4">
                Add to Cart 🛒
              </button>

              <div className="mt-3">
                <a href="/" className="link-primary">
                  &larr; Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
