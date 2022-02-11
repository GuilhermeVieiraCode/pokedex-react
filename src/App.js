import { useEffect, useState } from 'react';
import Card from './components/Card';
import Wrapper from './components/Wrapper'
import api from './services/api';
import './styles/style.css'

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function getPokemonData(urlPiece){
    const {data} = await api.get(`${urlPiece}`);
    
    const resp = await Promise.all(data.results.map(item => api.get(item.url)));

    const respData = resp.map(item => item.data);
    setPokemons(respData)
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
