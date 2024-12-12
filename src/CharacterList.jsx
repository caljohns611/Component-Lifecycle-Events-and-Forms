import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const publicKey = '80b88c9fe6974adf4fec984f35d6278f';
    const hash = '9929654e246d654f1e24623913910edf';

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`);
                setCharacters(response.data.data.results);
                setLoading(false);
            }   catch (err) {
                setError('Error fetching characters');
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
    <div className="character-grid">
      {characters.map((character) => (
        <div
          key={character.id}
          className="character-item"
          onClick={() => onCharacterSelect(character.id)}
        >
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="character-thumbnail"
          />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
    );
};

export default CharacterList;