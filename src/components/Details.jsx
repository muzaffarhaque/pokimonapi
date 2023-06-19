import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Details({data,model,location}) {
    // console.log(data)
  return (
    <div className='detail-main-frame '>
        <div className="">
        <FontAwesomeIcon icon={faArrowLeft} className='fs-4 fw-bold p-4' id='cancle-iocn' onClick={model}/>
        </div>
        <img className='details-image' src={data.sprites.front_default} alt="" />
        <h2 className='fs-34-24'>{data.moves[0].move.name}</h2>
        <ul className=" border-0 ">
                      <li className="list-group-item border-0 pt-3">
                        <h5 className="fs-20-18 fw-500">Abilites :-</h5>
                        {data.abilities?.map((item, i) => {
                          return (
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {item.ability.name}
                            </span>
                          );
                        })}
                      </li>
                      <li className="list-group-item border-0 location-Names py-3">
                        <h5 className="fs-20-18 fw-500">Locations :-</h5>
                        {location?.map((item, i) => {
                          return (
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {item.location_area.name}
                            </span>
                          );
                        })}
                      </li>
                      <li className="list-group-item border-0 pb-3">
                        <h5 className="fs-20-18 fw-500">species :-</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {data.species.name}
                      </li>
                      <li className="list-group-item border-0 pb-3">
                        <h5 className="fs-20-18 fw-500">weight :-</h5>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {data.weight}
                      </li>
                      <li className="list-group-item border-0 location-Names py-3">
                        <h5 className="fs-20-18 fw-500">Type :-</h5>
                        {data.types?.map((item, i) => {
                          return (
                            <span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              {item.type.name}
                            </span>
                          );
                        })}
                      </li>
                    </ul>
    </div>
  )
}
