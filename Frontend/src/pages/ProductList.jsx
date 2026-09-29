import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";



function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/`)
      .then((response) => {
        if (!response.ok) { 
          throw new Error("Failed to fetch products");
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
  }, [BASEURL]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5 text-danger">Error: {error}</div>;

  return (
    <div className="min-vh-100 bg-light">
      <h1 className="display-6 fw-bold text-center py-4 bg-white shadow-sm mb-4">
        Products
      </h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {product.length > 0 ? (
            product.map((item) => (
              <div key={item.id} className="col">
                <ProductCart product={item} />
              </div>
            ))
          ) : (
            <p className="text-center w-100 text-muted my-5 fs-5">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
