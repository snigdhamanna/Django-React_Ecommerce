import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();


    const [menuOpen, setMenuOpen] = useState(false);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
            <div className="container-fluid px-4">
                {/* Brand */}
                <Link to="/" className="navbar-brand fw-bold fs-4">
                    🛍️ SmAaL~ CaRt
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="mainNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
                    id="mainNav"
                >
                    <ul
                        className="navbar-nav ms-auto align-items-lg-center gap-lg-3"
                        onClick={() => setMenuOpen(false)} // close menu after a click
                    >
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-link btn btn-link">
                                    Logout
                                </button>
                            </li>
                        )}

                        {/* Cart with item-count badge */}
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link position-relative">
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
