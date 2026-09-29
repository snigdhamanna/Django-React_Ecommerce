import { useCart } from "../context/CartContext";
 
import { Link } from "react-router-dom";

function CartPage() {
    const { cartItems, total , removeFromCart, updateQuantity } = useCart();

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log("Cart Items:", cartItems);

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
    console.log(cartTotal)
    return (
        <div className="container mt-5 pt-5 min-vh-100 px-4">
            <h1 className="text-center fw-bold mb-4">🛒 Your Cart</h1>
            
            {cartItems.length === 0 ? (
                <p className="text-center text-muted fs-5 mt-5">Your cart is empty.</p>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">

                        <div className="card shadow-sm p-4 bg-white border-0 rounded-3 mb-4">
                            {cartItems.map((item) => (
                                
                                <div
                                    key={item.product_id || item.id || `cart-item-${item.product_name}`} 
                                    className="d-flex flex-column flex-md-row align-items-center justify-content-between border-bottom py-3 gap-3"
                                >
                                    
                                    <div className="d-flex align-items-center gap-3">
                                    {item.product_image && (
                                        <img
                                            src={`${BASEURL}${item.product_image}`}
                                            alt={item.product_name}
                                            className="cart-thumb rounded"
                                        />
                                    )}
                                    <div>
                                        <h2 className="h5 mb-1">{item.product_name}</h2>
                                        <p className="text-secondary mb-0">${item.product_price}</p>
                                    </div>
                                </div>

                                    <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3 w-100 w-md-auto">
                                        <div className="d-flex align-items-center gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary px-3"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="fw-semibold px-2">{item.quantity}</span>
                                            <button 
                                                className="btn btn-sm btn-outline-secondary px-3"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        <button 
                                            className="btn btn-link text-danger text-decoration-none p-0"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 mt-2 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                                <div className="d-flex align-items-baseline gap-2">
                                    <h4 className="fw-bold mb-0">Total:</h4>
                                    <span className="fs-4 fw-semibold text-success">
                                        ${total} 
                                    </span>
                                </div>
                                <Link 
                                    to="/checkout" 
                                    className="btn btn-primary btn-lg px-4 py-2 w-100 w-sm-auto shadow-sm"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
