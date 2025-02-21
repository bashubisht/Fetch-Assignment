import { useState, useEffect } from 'react';



const DogTile = (props) => {
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);

    useEffect(() => {
        setIsFavorite(props.isFavorite);
    }, [props.isFavorite]);

    const handleFavoriteClick = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        props.onFavoriteToggle(props.dog, newFavoriteState);
    };

    return (
        <div className="dog-tile">
            <img 
                src={props.dog.img} 
                alt={props.dog.name}
                className="dog-image"
            />
            <div className="dog-info">
                <h2>{props.dog.name}</h2>
                <div className="dog-details">
                    <p>Breed: {props.dog.breed}</p>
                    <p>Age: {props.dog.age}</p>
                    <p>Location: {props.dog.zip_code}</p>
                </div>
                <button 
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default DogTile;