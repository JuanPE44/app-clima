
import './PanelClima.scss';
import React, { useState } from "react";
import getClima from "../../services/getClima";
import getPrediccion from "../../services/getPrediccion";
import Form from '../Form/Form';
import Spinner from '../Spinner/Spinner';
import CardClima from '../CardClima/CardClima'

export default function PanelClima () {

  const [clima, setClima] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [localizacion, setLocalizacion] = useState('');

  const getInfo = async (loc) => {
    setCargando(true);
    getClima(loc)
      .then(dataClima => {
        setClima(dataClima);
        console.log(dataClima)
        setCargando(false)
        setMostrar(true)
      })
      .catch(error => {
        setCargando(false);
        setMostrar(false);
        console.log(error)
      });

    getPrediccion(loc)
      .then(dataPrediccion => {
        setPrediccion(dataPrediccion);
      })
      .catch(error => {
        setCargando(false);
        setMostrar(false);
        console.log(error)
      });
  }

  
  return(
    <div className="panel-clima">
      <Form 
        newLocalizacion = {getInfo}
      />
      
      {
      cargando ? <Spinner /> :
      mostrar 
        ? <CardClima 
          temperatura={clima.main.temp}
          viento={clima.wind.speed}
          humedad={clima.main.humidity}
          img={clima.weather[0].main}
          descImg={clima.weather[0].description}
          /> 
        : ''
      }
    </div>
  )
}