import React, { useEffect, useState } from 'react'
import pokemon_gif from './assets/pokemon_gif.gif'

const Pokeman = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")


  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

  const fetchPokemon = async () => {

    try {

      const res = await fetch(API);
      const data = await res.json();
      console.log(data);


      const pokemonDetails = data.results.map(async (currPokemon) => {

        const res = await fetch(currPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;

      })

      const pokemonResponse = await Promise.all(pokemonDetails)
      // console.log(pokemonResponse);
      setPokemon(pokemonResponse)
      setLoading(false)


    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(error)
    }

  }


  useEffect(() => {
    fetchPokemon();
  }, [])


  if (loading) {
    return <div className="loader">
      <div>
        <img src={pokemon_gif} alt={pokemon_gif} />
        <h1>Loading...</h1>
      </div>

    </div>
  }

  if (error) {
    return <div>
      <h6>{error.message}</h6>
    </div>
  }


  const searchData = pokemon.filter((currPokemon) => (
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  ))



  return (
    <section className='section'>
      <header>
        <h1> Lets Catch Pokémon</h1>
      </header>

      <div className="pokemon-search">
        <input placeholder="search Pokemon" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>


      <div className="cards">

        {searchData.map((currPokemon) => (
          <li className="pokemon-card" key={currPokemon.id}>
            <figure>
              <img src={currPokemon.sprites.other.dream_world.front_default} alt={currPokemon.name} className="pokemon-image" />
            </figure>
            <h1 className="pokemon-name">{currPokemon.name}</h1>
            <div className="pokemon-info pokemon-highlight">
              <p>{currPokemon.types.map(curType => curType.type.name).join(', ')}</p>
            </div>
            <div className="grid-three-cols">
              <p className="pokemon-info"><span> Height:</span> {currPokemon.height}</p>
              <p className="pokemon-info"><span> Weight:</span> {currPokemon.weight}</p>
              <p className="pokemon-info"><span> speed:</span> {currPokemon.stats[5].base_stat}</p>
            </div>
            <div className="grid-three-cols">
              <div className="pokemon-info">
                <p>{currPokemon.base_experience}</p>
                <span> Experience:</span>
              </div>
              <div className="pokemon-info">
                <p>{currPokemon.stats[0].base_stat}</p>
                <span>Attack:</span>
              </div>
              <div className="pokemon-info">
                <p>
                  {currPokemon.abilities.map(abilityInfo => abilityInfo.ability.name).slice(0, 1).join(', ')}
                </p>
                <span> Abilities: </span>
              </div>
            </div>
          </li>
        ))}

      </div>
    </section>

  )
}

export default Pokeman