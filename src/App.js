import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      setPokemonList(response.data.results);
    };
    fetchPokemon();
  }, []);

  const catchPokemon = (pokemonName) => {
    if (Math.random() < 0.5) {
      const newCaughtPokemon = { id: Date.now(), name: pokemonName }; // Unique ID
      setCaughtPokemons((prevCaught) => [...prevCaught, newCaughtPokemon]);
    } else {
      alert(`${pokemonName} escaped!`);
    }
  };

  const releasePokemon = (id) => {
    setCaughtPokemons((prevCaught) => prevCaught.filter(pokemon => pokemon.id !== id));
  };

  return (
    <div className="App">
      <h1>Pokémon Catcher</h1>
      <div className="grid ">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card card-container">
            <h2>{pokemon.name}</h2>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt={pokemon.name} />
            <button onClick={() => catchPokemon(pokemon.name)}>Catch</button>
          </div>
        ))}
      </div>
      <h2>Caught Pokémon</h2>
      <div className="caught-grid">
        {caughtPokemons.map((pokemon) => (
          <div key={pokemon.id} className="caught-card card-container">
            <h2>{pokemon.name}</h2>
            <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt={pokemon.name} />
            <button onClick={() => releasePokemon(pokemon.id)}>Release</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
