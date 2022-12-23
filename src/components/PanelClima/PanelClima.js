
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

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

export default function PanelClima() {

  const [clima, setClima] = useState([]);
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
        console.log(dataPrediccion.list)
        setPrediccion(separarDias(dataPrediccion.list))
        setClima(separarDias(dataPrediccion.list)[0]);
        setError(false)
      })
      .catch(error => {
        setCargando(false);
        setError(true)
      });


      getClima(loc)
      .then(data => {
        console.log(data)
      })
      
  }

  const cambiardia = (dia) => {
    setClima(dia)
  }

  return (
    <div className="panel-clima">
      <Form
        newLocalizacion={getInfo}
      />
      {
        !mostrar ? '' : (
          <div className='info-panel'>
            {
              cargando ? <Spinner /> : (
                <>
                  <CardClima
                    error={error}
                    dia={prediccion[0].dia}
                    img={prediccion[0].horas[0].weather[0].main}
                    temp={prediccion[0].horas[0].main.temp}
                    imgDescripcion={prediccion[0].horas[0].weather[0].description}
                    humedad={prediccion[0].horas[0].main.humidity}
                    viento={prediccion[0].horas[0].wind.speed}
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
        )
      }
    </div>
  )
}