import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterDetails = ({ characterId, onClose }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const publicKey = '80b88c9fe6974adf4fec984f35d6278f';
    const hash = '9929654e246d654f1e24623913910edf';

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`);
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            }   catch (err) {
                setError('Error fetching character details');
                setLoading(false);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    if(loading) return <p>Loading</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='character-detail'>
            <button onClick={onClose}>Close</button>
            <h2>{character.name}</h2>
            <p>{character.description || 'No description'}</p>
            <h3>Comics:</h3>
            <ul>
                {character.comic.items.length >0 ? (
                    character.comics.item.map((comic) => (
                        <li key={comic.resourceURI}>
                            <a href={comic.resourceURI} target="_blank" rel="noopener noreferrer">{comic.name}</a>
                        </li>
                    ))
                ) : (
                    <li>No comic available</li>
                )}
            </ul>
        </div>
    );
};

export default CharacterDetails;