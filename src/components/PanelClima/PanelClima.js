
import './PanelClima.scss';
import React, { useEffect, useState } from "react";
import Spinner from '../Spinner/Spinner';
import Form from '../Form/Form';
import CardClima from '../CardClima/CardClima'
import CardPredriccion from '../CardPrediccion/CardPrediccion';
import CardHoras from '../CardHoras/CardHoras';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useInfo } from '../../hooks/useInfo';
import Error from '../Error/Error';

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

export default function PanelClima() {

  const [dia, setDia] = useState([]);
  const [loc, setLoc] = useState('');
  const [mostrarHoras, setMostrarHoras] = useState(false);
  const { clima, prediccion, mostrar, cargando, error } = useInfo(loc)

  const cambiardia = (dia) => {
    setDia(dia)
  }

  const diaActual = () => {
    const date = new Date();
    let diaActual = date.getDay()
    return DIAS[diaActual]
  }

  useEffect(() =>{
    setDia(prediccion[0])
  },[prediccion])


  return (
    <div className="panel-clima">
      
      <Form
        newLocalizacion={setLoc}
      />
      {
        !mostrar ? '' : (
          <>
          {
            error ? '' : (
              <button className='ver-mas' onClick={() => setMostrarHoras(h => !h)}>
                {
                  !mostrarHoras ? <FontAwesomeIcon icon={faChevronRight} className='icono-verMas'/> : <FontAwesomeIcon icon={faChevronLeft} className='icono-verMas'/> 
                }
              </button>
            )
          }
          
          <div className='info-panel'>
            {
              cargando ? <Spinner /> : (
                <>
                {
                  error
                  ? <Error errorInfo={error} />
                  : <>
                    <CardClima
                      dia={diaActual()}
                      img={clima.weather[0].main}
                      temp={clima.main.temp }
                      imgDescripcion={clima.weather[0].description}
                      humedad={clima.main.humidity}
                      viento={clima.wind.speed}
                    />
                    <CardPredriccion
                      diaSeleccionado={dia}
                      cambiarDia={cambiardia}
                      infoPrediccion={prediccion}
                    />                    
                    </>
                }                                                                                                      
                </>
              )
            }
          </div>
          {                   
            !mostrarHoras ? '' : (
              <CardHoras 
                dia={dia.dia}
                diaHoras={dia.horas}               
              />
            )
          }
          </>
        )
      }
    </div>
  )
}