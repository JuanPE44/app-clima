
import './Hora.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons'

export default function diaHora ({ hora, temp, img, viento, humedad }) {
  return (
    <div className='hora'>
      <div className='divHora'>{hora}</div>
      <img src={require(`../../assets/imgs/${img}.png`)} alt={hora}/>
      <div className='hora-temp'>{temp}</div>
      <div className='algo'>
        <div className='hora-humedad'>
          <FontAwesomeIcon className='humedad-icono' icon={faDroplet} />
          <div>{humedad}%</div>
        </div>
        <div className='hora-viento'>
          <FontAwesomeIcon className='humedad-icono' icon={faWind} />
          <div>{viento}Km/h</div>
        </div>
      </div>
    </div>
  )
}