
import './CardClima.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import Error from '../Error/Error';

export default function CardClima({ error, img, imgDescripcion, temp, humedad, viento, dia = 'domingo' }) {
  return (
    <div className="card-clima">
      {error
        ? <Error errorInfo={error} />
        : <>
          <div className='main-clima'>
            <h4 className='clima-dia'>{dia}</h4>
            <img className='clima-img' src={require(`../../assets/imgs/${img}.png`)} alt={img} />
            <div className='clima-temperatura'>{Math.round(parseInt(temp))}</div>
            <div className='clima-descripcion'>{imgDescripcion}</div>
          </div>
          <div className='footer-clima'>
            <div className='clima-humedad'>
              <FontAwesomeIcon className='humedad-icono' icon={faDroplet} />
              <div className='humedad'>
                <div className='humedad-porcentaje'>{humedad}%</div>
                <div className='humedad-descripcion'>humedad</div>
              </div>
            </div>
            <div className='clima-viento'>
              <FontAwesomeIcon className='viento-icono' icon={faWind} />
              <div className='viento'>
                <div className='viento-porcentaje'>{viento}Km/h</div>
                <div className='viento-descripcion'>viento velocidad</div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

