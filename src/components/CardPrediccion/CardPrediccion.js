import './CardPrediccion.scss';
import Prediccion from '../Prediccion/Prediccion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

export default function CardPredriccion({ infoPrediccion, cambiarDia, diaSeleccionado }) {

  const [predicciones, setPredicciones] = useState({ actualesDias: [], proximosDias: [] })
  const { actualesDias, proximosDias } = predicciones;
  const [estadoBoton, setEstadoBoton] = useState(true);
  const visibilityPrev = {
    visibility: estadoBoton ? 'hidden' : 'visible'
  };
  const visibilityNext = {
    visibility: !estadoBoton ? 'hidden' : 'visible'
  };  
  let mostrarPrediccion = estadoBoton ? actualesDias : proximosDias;


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
      {/*<h5 className='prediccion-titulo'>PREDICCIONES</h5>*/}
      <ul className='contenedor-predicciones'>
        {
        mostrarPrediccion.map((dia, index) => {
          let img = dia.horas[0].weather[0].main;
          const [tempMax, tempMin] = obtenerTemperaturas(dia.horas)              
          
          return (
            <Prediccion
              index={index}
              diaSeleccionado={diaSeleccionado}
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