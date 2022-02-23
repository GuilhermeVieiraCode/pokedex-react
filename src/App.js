import { useEffect, useState } from 'react';
import Button from './components/Button';
import ButtonContainer from './components/ButtonContainer';
import Card from './components/Card';
import Container from './components/Container';
import Header from './components/Header';
import api from './services/api';
import './styles/container.css';
import './styles/btn-container.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFixed, setPokemonsFixed] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function getPokemonData(urlPiece){
    const {data} = await api.get(`${urlPiece}`);
    
    const resp = await Promise.all(data.results.map(item => api.get(item.url)));

    const respData = resp.map(item => item.data);
    
    setPokemons(respData);
    setPokemonsFixed(respData);
  }

  async function getPokemonTypeData(){
    const {data} = await api.get("https://pokeapi.co/api/v2/type");
  
    const respData = data.results.map(item => item.name);

    const typesToRemove = ['dark', 'unknown', 'shadow'];

    const filterTypes = respData.filter(item => typesToRemove.includes(item) === false);

    filterTypes.sort((a, b) => a[0].localeCompare(b[0]));
                                
    setPokemonTypes(filterTypes);
  }

  function getPokemonByType(type){

    let aux = [];
    pokemonsFixed.map(item => item.types
      .forEach(element => {
      if(element.type.name === type) aux.push(item);
    })
    );
    
    setPokemons(aux);
    
  }
  
  useEffect(() => {
    getPokemonData('/pokemon?limit=151')
    getPokemonTypeData();
  }, [])

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header text={"Pokedex - Kanto Region"}></Header>
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
