import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetails';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterSelect = (id) => {
    setSelectedCharacterId(id);
  };

  const handleCloseDetail = () => {
    setSelectedCharacterId(null);
  };

  return (
    <div className="app">
      <h1>Marvel Characters</h1>
      {selectedCharacterId ? (
        <CharacterDetails characterId={selectedCharacterId} onClass={handleCloseDetail} />
      ) : (
        <CharacterList onCharacterSelect={handleCharacterSelect} />
      )}
    </div>
  );
};

export default App;