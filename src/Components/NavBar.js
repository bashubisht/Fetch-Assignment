
import { useNavigate } from 'react-router-dom';


const NavBar = ( props ) => {
    const navigate = useNavigate();

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
        })
        .catch(error => {
            console.error('Error during logout:', error);
            // Optionally, show an error message to the user
        });
    };

    const goToHome = () => {
        navigate('/search');
    };
    const goToFavorites = () => {
        navigate('/favorites', { state: { favoriteDogList: props.favoriteDogList } });
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
                    ❤️ Favorites ({props.favoriteDogList.length})
                </button>
                <button onClick={handleLogout} className="nav-button logout">
                    👋 Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;