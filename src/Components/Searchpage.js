import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DogTile from "./DogTile";
import "./SearchPage.css";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SearchPage = () => {
    const [dogs, setDogs] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [favoriteDogList, setFavoriteDogList] = useState([]);
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const pageSize = 25;

    const [sortTerm, setSortTerm] = useState("breed");

    useEffect(() => {
        fetchBreeds();
        fetchDogs();
    }, [currentPage, selectedBreed, sortOrder, ageMin, ageMax, zipCode, sortTerm]);

    const fetchBreeds = async () => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setBreeds(data);
            }
        } catch (error) {
            console.error('Error fetching breeds:', error);
        }
    };

    const fetchDogs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const from = (currentPage - 1) * pageSize;
            const searchUrl = new URL('https://frontend-take-home-service.fetch.com/dogs/search');
            
            if (selectedBreed) {
                searchUrl.searchParams.append('breeds', selectedBreed);
            }
            if (ageMin) {
                searchUrl.searchParams.append('ageMin', ageMin);
            }
            if (ageMax) {
                searchUrl.searchParams.append('ageMax', ageMax);
            }
            if (zipCode) {
                searchUrl.searchParams.append('zipCodes', zipCode);
            }
            
            searchUrl.searchParams.append('sort', `${sortTerm}:${sortOrder}`.toLowerCase());
            searchUrl.searchParams.append('size', pageSize.toString());
            if (from > 0) {
                searchUrl.searchParams.append('from', from.toString());
            }

            const response = await fetch(searchUrl.toString(), {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Search failed with status: ${response.status}`);
            }

            const searchData = await response.json();
            setTotalPages(Math.ceil(searchData.total / pageSize));

            if (searchData.resultIds.length > 0) {
                const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(searchData.resultIds)
                });

                if (!dogsResponse.ok) {
                    throw new Error(`Failed to fetch dog details: ${dogsResponse.status}`);
                }

                const dogsData = await dogsResponse.json();
                setDogs(dogsData);
                window.scrollTo(0, 0);
            } else {
                setDogs([]);
            }
        } catch (error) {
            setError(error.message);
            setDogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavoriteToggle = (dog, isFavorite) => {
        if (isFavorite) {
            setFavoriteDogList([...favoriteDogList, dog]);
        } else {
            setFavoriteDogList(favoriteDogList.filter(d => d.id !== dog.id));
        }
    };

    const resetFilters = () => {
        setSelectedBreed('');
        setAgeMin('');
        setAgeMax('');
        setZipCode('');
        setSortOrder('asc');
        setCurrentPage(1);
    };

    return (
        <div className="search-page">
            <NavBar title="🐕 Dog Search" favoriteDogList={favoriteDogList} />
            
            <div className="search-panel">
                <h2>Search Filters  <button  onClick={resetFilters} className="reset-button">
                        Reset Filters
                    </button></h2>


                <div className="search-controls">
                    <div className="filter-group">
                        <label>Breed:</label>
                        <select 
                            value={selectedBreed}
                            onChange={(e) => {
                                setSelectedBreed(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="breed-select"
                        >
                            <option value="">All Breeds</option>
                            {breeds.map((breed) => (
                                <option key={breed} value={breed}>{breed}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Age Range:</label>
                        <div className="age-inputs">
                            <input
                                type="number"
                                placeholder="Min Age"
                                value={ageMin}
                                onChange={(e) => {
                                    setAgeMin(e.target.value);
                                    setCurrentPage(1);
                                }}
                                min="0"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max Age"
                                value={ageMax}
                                onChange={(e) => {
                                    setAgeMax(e.target.value);
                                    setCurrentPage(1);
                                }}
                                min={ageMin || "0"}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            placeholder="ZIP Code"
                            value={zipCode}
                            onChange={(e) => {
                                setZipCode(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Sort By
                        <icon
                            
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                            
                        >
                            {sortOrder === 'asc' ? (
                                <FaSortAmountUp className="sort-icon" />
                            ) : (
                                <FaSortAmountDown className="sort-icon" />
                            )}
                        </icon> 
                        
                        </label>
                          
                        <select 
                            value={sortTerm}
                            onChange={(e) => {
                                console.log("e.target.value=====> ", e.target.value)
                                setSortTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="sort-select"
                        >
                            <option>Breed</option>
                            <option>Name</option>
                            <option>Age</option>
                            
                            
                        </select>   
                        
                    </div>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Fetching dogs...</p>
                </div>
            ) : dogs.length === 0 ? (
                <div className="no-results">
                    <p>No dogs found matching your criteria</p>
                </div>
            ) : (
                <div className="dogs-grid">
                    {dogs.map((dog) => (
                        <DogTile 
                            key={dog.id}
                            dog={dog}
                            isFavorite={favoriteDogList.some(favDog => favDog.id === dog.id)}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
       
                    ))}
                </div>
            )}

            {dogs.length > 0 && (
                <div className="pagination">
                    <button 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1 || isLoading}
                        className="pagination-button"
                    >
                        ← Previous
                    </button>
                    <div className="page-info">
                        Page {currentPage} of {totalPages}
                    </div>
                    <button 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        className="pagination-button"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchPage;