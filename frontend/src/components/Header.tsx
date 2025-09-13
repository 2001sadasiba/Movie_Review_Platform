import { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    return (
        <header className="app-header">
            <div className="container header-container">
                <div className="logo">MovieReview</div>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>

                {/* Nav Links */}
                <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    <a href="/">Home</a>
                    <a href="/#movies">Movies</a>
                    <a href="/#reviews">Reviews</a>
                    <a href="/#profile">Profile</a>
                    <a href="/#logout">Logout</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
