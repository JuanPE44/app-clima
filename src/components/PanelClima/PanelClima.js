
import './PanelClima.scss';
import React, { useState } from "react";
import getPrediccion from "../../services/getPrediccion";
import getClima from "../../services/getClima";
import Spinner from '../Spinner/Spinner';
import Form from '../Form/Form';
import CardClima from '../CardClima/CardClima'
import CardPredriccion from '../CardPrediccion/CardPrediccion';
import { useLocation } from 'wouter';
import CardHoras from '../CardHoras/CardHoras';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

export default function PanelClima() {

  const [clima, setClima] = useState([]);
  const [dia, setDia] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);
  const [path, pushLocation] = useLocation();
  const [cargando, setCargando] = useState([])

  const separarDias = (arrayDias) => {
    let diasSeparados = [];
    let horas = [];
    let indexDia;
    arrayDias.forEach((d, index) => {
      let date = new Date(d.dt_txt);
      if (index === 0) { indexDia = date.getDay(date) }
      if (indexDia !== date.getDay(date)) {
        diasSeparados.push({ dia: DIAS[indexDia], horas })
        indexDia = date.getDay(date);
        horas = [];
      }
      horas.push(d);
      if (index === 39) { diasSeparados.push({ dia: DIAS[indexDia], horas }) }
    })
    return diasSeparados;
  }

  const getInfo = async (loc) => {
    pushLocation(`/${loc}`)
    console.log(path)
    setCargando(true);
    setMostrar(true)

    getPrediccion(loc)
      .then(dataPrediccion => {
        setCargando(false)
        setPrediccion(separarDias(dataPrediccion.list))
        setError(false)
      })
      .catch(error => {
        setCargando(false);
        setError(true)
      });


      getClima(loc)
      .then(data => {
        setClima(data);
      })
      
  }

  const cambiardia = (dia) => {
    setDia(dia)
  }

  const diaActual = () => {
    const date = new Date();
    let diaActual = date.getDay()
    return DIAS[diaActual]
  }

  

  return (
    <div className="panel-clima">
      
      <Form
        newLocalizacion={getInfo}
      />
      {
        !mostrar ? '' : (
          <>
          <button className='ver-mas'>
            <FontAwesomeIcon icon={faChevronRight} className='icono-verMas'/>
          </button>
          <div className='info-panel'>
            {
              cargando ? <Spinner /> : (
                <>
                  <CardClima
                    error={error}
                    dia={diaActual()}
                    img={clima.weather[0].main}
                    temp={clima.main.temp}
                    imgDescripcion={clima.weather[0].description}
                    humedad={clima.main.humidity}
                    viento={clima.wind.speed}
                  />
                  <CardPredriccion
                    cambiarDia={cambiardia}
                    infoPrediccion={prediccion}
                    error={error}
                  />
                </>
              )
            }
          </div>
          </>
        )
      }
    </div>
  )
}