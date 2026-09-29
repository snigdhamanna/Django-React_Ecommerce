import React from 'react'
;
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const Navbar = () => {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top px-4 py-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fs-3 fw-bold text-dark">
                    🛍️ smallCart
                </Link>

                <Link to="/cart" className="nav-link fw-medium text-dark position-relative ps-2">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartCount}
                            </span>
                        )}
                    </Link>
            </div>
    </nav>
    
  )
}

export default Navbar