import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../../components/GetData";
import './home.scss'
import groupBy from "../../../util/GroupFunction";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [locationmSerch,setLocationmSerch]=useState([])



  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`
      );
      const newPokemonList = response.data.results;

      const updatedPokemonList = await Promise.all(
        newPokemonList.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          const Locations = await axios.get(pokemonData.data.location_area_encounters);
          // console.log(Locations)
          const groupedItemsLocation = groupBy(Locations.data, (item) => item.location_area.name);
          const groupedItemsabilities = groupBy(pokemonData.data.abilities, (item) => item.ability.name);
          setLocationmSerch(Object.keys(groupedItemsLocation));
          // console.log(groupedItemsabilities)
          console.log(pokemonData.data)
          return [{ firstData:pokemonData.data ,secondLocation:Locations.data}];
        })
      );
      // console.log(updatedPokemonList[0].map((item,i)=>item.firstData))
      setPokemonList((prevList) => [...prevList, ...updatedPokemonList]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {pokemonList?.map((pokemon, index) => (
        <div>
       {
        pokemon?.map((intem2,i)=>{
          // console.log(intem2.firstData);
          // console.log(intem2.secondLocation);
          return(
            <div>
             <h2>{intem2.firstData.name}</h2> 
              <div className="location-Names">{
               intem2.secondLocation?.map((item,i)=>{
                return(<span>
                  {item.location_area.name}
                  </span>
                )
               })

              }</div>
            </div>
          )
        })
       }
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Home;


