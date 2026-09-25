import { useEffect, useState } from "react";

// 1. Capitalized "App"
function App() {
  const [product, setProduct] = useState(['']);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('error fetching api', error));
  }, []);
  



  return (
    <>
   
  <div className="min-vh-100 bg-light text-dark">
    <div className="container py-4">
      <h1 className="display-6 fw-bold mb-4">Product List</h1>
      
      {product.map(product => (
        <div key={product.id} className="card p-4 shadow-sm mb-4 border-0">
          <h2 className="h4 fw-semibold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <p className="text-dark fw-bold">${product.price}</p>
        </div>
      ))}
    </div>
  </div>

   
    </>
  );
}

export default App;
