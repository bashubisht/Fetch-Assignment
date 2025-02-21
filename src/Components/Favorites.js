import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import DogTile from './DogTile';
import './Favorites.css';

const Favorites = ({onFavoriteToggle}) => {
    const location = useLocation();
    const [error, setError] = useState(null);
    const [matchedDog, setMatchedDog] = useState(null);
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
    const [favoriteDogList, setFavoriteDogList] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteDogs');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteDogs', JSON.stringify(favoriteDogList));
    }, [favoriteDogList]);

    const handleFavoriteToggle = (dog, isFavorite) => {
        if (!isFavorite) {
            const updatedList = favoriteDogList.filter(d => d.id !== dog.id);
            setFavoriteDogList(updatedList);
            localStorage.setItem('favoriteDogs', JSON.stringify(updatedList));
        }
        if (onFavoriteToggle) onFavoriteToggle(dog, isFavorite);
    };

    const findMatch = async () => {
        if (favoriteDogList.length === 0) {
            setError('Please add some dogs to your favorites first!');
            return;
        }

        setIsGeneratingMatch(true);
        setError(null);

        try {
            const matchResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(favoriteDogList.map(dog => dog.id))
            });
            if (!matchResponse.ok) {
                throw new Error('Failed to generate match');
            }

            const { match } = await matchResponse.json();
            console.log('Match ID received:', match)
            const dogResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify([match])
            });

            if (!dogResponse.ok) {
                throw new Error('Failed to fetch matched dog details');
            }

            const [matchedDogData] = await dogResponse.json();
            console.log('Matched dog data:', matchedDogData);
            
            setMatchedDog(matchedDogData);
            setShowMatchModal(true);
        } catch (error) {
            console.error('Error finding match:', error);
            setError('Failed to generate match. Please try again.');
        } finally {
            setIsGeneratingMatch(false);
        }
    };

    return (
        <div className="favorites-container">
               <NavBar 
               title="❤️ My Favorite Dogs"
             favoriteDogList={favoriteDogList}
           />

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            <div className="favorites-grid">
                {favoriteDogList.map((dog) => (
                    <DogTile 
                        key={dog.id}
                        dog={dog}
                        isFavorite={true}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </div>
            
            <button 
                 className={`find-match-button ${isGeneratingMatch ? 'loading' : ''}`}
                 onClick={findMatch}
                disabled={favoriteDogList.length === 0 || isGeneratingMatch}
             >
                {isGeneratingMatch ? 'Finding Your Match...' : 'Find My Match!'}
            </button>
           

            {showMatchModal && matchedDog && (
                <div className="match-modal-overlay" onClick={() => setShowMatchModal(false)}>
                    <div className="match-modal" onClick={e => e.stopPropagation()}>
                        <div className="match-content">
                            <div className="match-header">
                                <h2>🎉 It's a Match! 🎉</h2>
                                <p>Based on your favorite dogs, we found your perfect companion!</p>
                            </div>
                            
                            <div className="matched-dog-card">
                                <div className="matched-dog-image">
                                    <img src={matchedDog.img} alt={matchedDog.name} />
                                </div>
                                <div className="matched-dog-info">
                                    <h3>{matchedDog.name}</h3>
                                    <div className="dog-details">
                                        <p><span>Breed:</span> {matchedDog.breed}</p>
                                        <p><span>Age:</span> {matchedDog.age} years</p>
                                        <p><span>Location:</span> {matchedDog.zip_code}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="close-modal-button"
                                onClick={() => setShowMatchModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Favorites;
