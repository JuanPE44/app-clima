
import './CardClima.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons'

export default function CardClima ({ temperatura = '0', viento = '0', humedad = '0', img='404', descImg }) {
  console.log(img)
  return (
    <div className="card-clima">
      <div className='main-clima'>        
        <img className='clima-img' src={require(`../../assets/imgs/${img}.png`)} />
        <div className='clima-temperatura'>{Math.round(parseInt(temperatura))}</div>
        <div className='clima-descripcion'>{descImg}</div>
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
    </div>
  );
}

