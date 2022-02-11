import { useEffect, useState } from 'react';
import Card from './components/Card';
import Wrapper from './components/Wrapper'
import api from './services/api';
import './styles/style.css'

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function getPokemonData(urlPiece){
    await api.get(`${urlPiece}`).then(response => {
      response.data.results.forEach(element => {
        api.get(element.url).then(response => {
          let { data } = response;
          let name = data.name;
          let id = data.id;
          let image = data.sprites.front_default;
          let types = data.types;
          let newContent = {
            "id": id,
            "name": name,
            "image": image,
            "types": types 
          }
          setPokemons(oldArray => [...oldArray, newContent])
        })
      });
    })
  }

  useEffect(() => {
    getPokemonData('/pokemon?limit=151')
  }, [])

  return (
    <>
      <Wrapper>
      {pokemons.map(item => {
        return(
            <Card key={item.id} data={item}/>
          )
        })}
      </Wrapper>
    </>
  );
}

export default App;
