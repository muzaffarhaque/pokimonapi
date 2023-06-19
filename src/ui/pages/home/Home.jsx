import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../../components/GetData";
import "./home.scss";
import groupBy from "../../../util/GroupFunction";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave,faBookmark,faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import Details from "../../../components/Details";
const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [locationmSerch, setLocationmSerch] = useState([]);
  const [serchData, setSerchData] = useState({
    ability: "Abilities",
    move: "",
    species: "",
  
  });
  const { ability, move, species } = serchData;
  const [save, setSave] = useState(false);
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
          const Locations = await axios.get(
            pokemonData.data.location_area_encounters
          );
          // console.log(Locations)
          const groupedItemsLocation = groupBy(
            Locations.data,
            (item) => item.location_area.name
          );
          const groupedItemsabilities = groupBy(
            pokemonData.data.abilities,
            (item) => item.ability.name
          );
          setLocationmSerch(Object.keys(groupedItemsLocation));
          // console.log(groupedItemsabilities)
          // console.log(Locations.data);
          return [
            {
              firstData: pokemonData.data,
              secondLocation: Locations.data,
            },
          ];
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
  const [checkboxesdata, setCheckboxesdata] = useState([]);
  const handleCheckboxChange = (event, outerIndex, innerIndex) => {
    const checkboxId = pokemonList[outerIndex][innerIndex].firstData.id; // Get the checkbox ID from the corresponding data
    const isChecked = event.target.checked;
 
    if (isChecked) {
      // Add the checkbox to the array
      setCheckboxesdata([...checkboxesdata, checkboxId]);
    } else {
      // Remove the checkbox from the array
      setCheckboxesdata(checkboxesdata.filter((id) => id !== checkboxId));
    }
    console.log();
  };

  const [show,setShow]=useState(false);
  const [cardData,setCardData]=useState([])
  function model(){
    setShow(!show);
  }
  function showDetails(data){
    // console.log(data)
    setCardData(data)
    model()
  }

  // todo:Filter functin
 
   
  function filterData(data){
    // const abilityData=data[0].firstData.filter((item)=>item.abilities[0].ability.name.includes(ability))
    if(data[0].firstData.abilities[0].ability.name==ability || data[0].firstData.name==move || data[0].firstData.species.name==species ){
      console.log(data)
       return data;
    }
  //  console.log(data[0].firstData.abilities[0].ability.name)
   }
  // todo:Filter functin
  return (
    <div>
      <div className=" container   w-100 py-4 d-flex align-items-center justify-content-between">
        <h3 className="serch-heading fs-64-34 fw-bold text-black">Search</h3>
        <div className="bookmark-frame d-flex align-items-center justify-content-center">
          {checkboxesdata.length>0?<span className="no-book">{checkboxesdata.length}</span>:""}
         
        <FontAwesomeIcon icon={faBoxArchive} className="bookMark-box"/>
        </div>
 
      </div>
      <div className="container dropdown-frame">
        <div className="dropdown-wrapper">
          <Dropdown
            onSelect={(value) => setSerchData({ ...serchData, ability: value })}
          >
            <Dropdown.Toggle className="drop-down-button" id="dropdown-basic">
              {ability}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="shed-skin">shed-skin</Dropdown.Item>
              <Dropdown.Item eventKey="shield-dust">shield-dust</Dropdown.Item>
              <Dropdown.Item eventKey="run-away">run-away</Dropdown.Item>
              <Dropdown.Item eventKey="compound-eyes">
                compound-eyes
              </Dropdown.Item>
              <Dropdown.Item eventKey="sniper">sniper</Dropdown.Item>
              <Dropdown.Item eventKey="keen-eye">keen-eye</Dropdown.Item>
              <Dropdown.Item eventKey="swarm">swarm</Dropdown.Item>
              <Dropdown.Item eventKey="{swarm}">swarm</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="dropdown-wrapper">
          <input
            className="inpt-box w-100 "
            placeholder="Serch Move"
            onChange={(e) =>
              setSerchData({ ...serchData, move: e.target.value })
            }
            value={move}
            name="move"
            id="dropdown-basic"
          ></input>
        </div>
       
        <div className="dropdown-wrapper">
        <input
            className="inpt-box w-100 "
            placeholder="Serch Species"
            onChange={(e) =>
              setSerchData({ ...serchData, species: e.target.value })
            }
            value={species}
            name="move"
            id="dropdown-basic"
          ></input>
       
        </div>
      </div>
      <div className="main-frame-cards">
        {pokemonList?.map((pokemon, index) => (
          <div className="bostrap-card" key={index}>
            {filterData(pokemon)?.map((intem2, i) => {
              // console.log(pokemon[0]);
              //  console.log(intem2.secondLocation);
              return (
                <div key={i} className="w-100">
                  {/* CARD START  */}

                  <div className="card border-0 w-100">
                    <img
                    onClick={()=>showDetails(intem2.firstData)}
                      src={intem2.firstData.sprites.front_default}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h3 className="card-title">
                        {" "}
                        {intem2.firstData.moves[0].move.name}
                      </h3>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                    <ul className="list-group border-0 list-group-flush">
                      <li className="list-group-item border-0">
                        <h5 className="fs-20-18 fw-500">Abilites :-</h5>
                        {intem2.firstData.abilities?.map((item, i) => {
                          return (
                            <span key={i}>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {item.ability.name}
                            </span>
                          );
                        })}
                      </li>
                      <li className="list-group-item border-0 location-Names">
                        <h5 className="fs-20-18 fw-500">Locations :-</h5>
                        {intem2.secondLocation?.map((item, i) => {
                          return (
                            <span key={i}>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {item.location_area.name}
                            </span>
                          );
                        })}
                      </li>
                      <li className="list-group-item border-0">
                        <h5 className="fs-20-18 fw-500">species :-</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {intem2.firstData.species.name}
                      </li>
                    </ul>
                    <div className="card-body d-flex align-items-center justify-content-end">
                      <input
                        type="checkbox"
                        checked={checkboxesdata.includes(intem2.firstData.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, index, i)
                        }
                        id={`so-${index}-${i}`} // Add index and i to make it unique
                        name="checkbox"
                        className=" d-none"
                      />
                      <label htmlFor={`so-${index}-${i}`} className="lable">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          size="2x"
                          color="rgb(146, 145, 143)"
                          className={`${checkboxesdata.includes(intem2.firstData.id) ? 'save_icon_blue' : ''}`}
                        />
                      </label>
                    </div>
                  </div>
                  {/* CARD END  */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="center-body">
          <div className="loader-circle-11">
            <div className="arc"></div>
            <div className="arc"></div>
            <div className="arc"></div>
          </div>
        </div>
      )}
      {show &&
        <Details model={model} data={cardData} location={pokemonList[0][0].secondLocation}/>
      }
    </div>
  );
};

export default Home;
