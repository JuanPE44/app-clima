
import './CardPrediccion.scss';
import Prediccion from '../Prediccion/Prediccion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

const DIAS = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

export default function CardPredriccion ({ prediccion, cargando, error }) {
  const [dias, setDias] = useState([]);


  const obtenerTemperaturas = (dia) => {
    let temperaturas = [];
    dia.forEach(hora => {
      temperaturas.push(hora.main.temp)
    })
    let tempMax = Math.round(Math.max(...temperaturas));
    let tempMin = Math.round(Math.min(...temperaturas));
    return [tempMax, tempMin];
  }

  useEffect(() => {
    setPredicciones({ actualesDias: infoPrediccion.slice(0, 3), proximosDias: infoPrediccion.slice(3, 6) })
  }, [infoPrediccion])

  return (
    <div className='card-prediccion'>
      <ul className='contenedor-predicciones'>
        {
          error ? <h5>Predicciones no encontradas :'/</h5> : (
            mostrarPrediccion.map((dia) => {
              let img = dia.horas[0].weather[0].main;
              const [tempMax, tempMin] = obtenerTemperaturas(dia.horas)
              return (
                <Prediccion
                  cambiarDia={cambiarDia}
                  arrayDia={dia}
                  key={dia.dia}
                  dia={dia.dia}
                  img={img}
                  tempMax={tempMax}
                  tempMin={tempMin}
                />
              )
            })
          )
        }
        <span className='control-prev' style={visibilityPrev} onClick={() => setEstadoBoton(e => !e)}>
          <FontAwesomeIcon className='prev-icono' icon={faChevronLeft} />
        </span>
        <span className='control-next' style={visibilityNext} onClick={() => setEstadoBoton(e => !e)}>
          <FontAwesomeIcon className='next-icono' icon={faChevronRight} />
        </span>
      </ul>
    </div>
  )
}