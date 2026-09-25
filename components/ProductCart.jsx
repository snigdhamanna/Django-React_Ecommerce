

function ProductCart({product}) {
    return (
        <>
         <div className="card h-100 border-0 rounded-4 shadow-sm product-card">
    <img
      src={product.image}
      alt={product.name}
      className="card-img-top object-fit-cover rounded-top-4 mb-3"
      style={{ height: "14rem" }} 
    />
    <div className="card-body p-3 pt-0">
      <h2 className="h5 fw-semibold text-dark text-truncate mb-1">
        {product.name}
      </h2>
      <p className="text-secondary fw-medium mb-0">
        ${product.price}
      </p>
    </div>
  </div>

        </>

    )
}
export default ProductCart