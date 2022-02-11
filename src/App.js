import { useEffect, useState } from 'react';
import Button from './components/Button';
import ButtonContainer from './components/ButtonContainer';
import Card from './components/Card';
import Container from './components/Container'
import api from './services/api';
import './styles/container.css';
import './styles/btn-container.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  async function getPokemonData(urlPiece){
    const {data} = await api.get(`${urlPiece}`);
    
    const resp = await Promise.all(data.results.map(item => api.get(item.url)));

    const respData = resp.map(item => item.data);
    
    setPokemons(respData);
  }

  async function getPokemonTypeData(){
    const {data} = await api.get("https://pokeapi.co/api/v2/type");
  
    const respData = data.results.map(item => item.name);

    const typesToRemove = ['dark', 'unknown', 'shadow'];

    const filterTypes = respData.filter(item => typesToRemove.includes(item) === false);
                                
    setPokemonTypes(filterTypes);
  }

  async function getPokemonByType(type){
    const {data} = await api.get('/pokemon?limit=151');
    
    const resp = await Promise.all(data.results.map(item => api.get(item.url)));

    const respData = resp.map(item => item.data);

    let aux = [];
    respData.map(item => item.types
      .forEach(element => {
      if(element.type.name === type) aux.push(item);
    })
    );
    
    setPokemons(aux)
  }
  
  useEffect(() => {
    getPokemonData('/pokemon?limit=151')
    getPokemonTypeData();
  }, [])

  return (
    <>
      <ButtonContainer>
        {pokemonTypes.map(item => {
          return(
            <Button onClick={() => getPokemonByType(item)} key={item} className={`btn-${item}`} text={item}/>
          )
        })}
        <Button onClick={() => getPokemonData('/pokemon?limit=151')} className={"btn-all"} text={"All"}/>
      </ButtonContainer>
      <Container>
      {pokemons.map(item => {
        return(
            <Card key={item.id} data={item}/>
          )
        })}
      </Container>
    </>
  );
}

export default App;
