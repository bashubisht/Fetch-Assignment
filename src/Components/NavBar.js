import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const NavBar = ( props ) => {
    const navigate = useNavigate();

    const getFavoriteCount = () => {
        const savedFavorites = localStorage.getItem('favoriteDogs');
        return savedFavorites ? JSON.parse(savedFavorites).length : 0;
    };

    const handleLogout = () => {
        fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            navigate('/');
            localStorage.removeItem('sessionActive');
            localStorage.removeItem('favoriteDogs'); // Clear favorites on logout
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };

    const goToHome = () => {
        navigate('/search');
    };
    
    const goToFavorites = () => {
        const savedFavorites = localStorage.getItem('favoriteDogs');
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
        navigate('/favorites', { state: { favoriteDogList: favorites } });
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                {props.title}
            </div>
            <div className="nav-links">
                <button onClick={goToHome} className="nav-button">
                    🏠 Home
                </button>
                <button onClick={goToFavorites} className="nav-button">
                    ❤️ View Favorites 
                    {/* ({getFavoriteCount()}) */}
                </button>
                <button onClick={handleLogout} className="nav-button logout">
                    👋 Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;