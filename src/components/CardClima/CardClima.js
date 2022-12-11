
import './CardClima.scss';
import Spinner from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import Error from '../Error/Error';

export default function CardClima ({ clima, cargando, error }) {
  

  return (
    <div className="card-clima">
      {        
        cargando ? <Spinner /> : 
        error ? <Error errorInfo={error}/> :        
        <React.Fragment>
          <div className='main-clima'>        
            <img className='clima-img' src={require(`../../assets/imgs/${clima.weather[0].main}.png`)} />
            <div className='clima-temperatura'>{Math.round(parseInt(clima.main.temp))}</div>
            <div className='clima-descripcion'>{clima.weather[0].description}</div>
          </div>
          <div className='footer-clima'>
            <div className='clima-humedad'>
              <FontAwesomeIcon className='humedad-icono' icon={faDroplet} />
              <div className='humedad'>
                <div className='humedad-porcentaje'>{clima.main.humidity}%</div>
                <div className='humedad-descripcion'>humedad</div>
              </div>
            </div>
            <div className='clima-viento'>
              <FontAwesomeIcon className='viento-icono' icon={faWind} />
              <div className='viento'>
                <div className='viento-porcentaje'>{clima.wind.speed}Km/h</div>
                <div className='viento-descripcion'>viento velocidad</div>
              </div>
            </div>          
          </div> 
        </React.Fragment>                 
      }  
    </div>
  );
}

