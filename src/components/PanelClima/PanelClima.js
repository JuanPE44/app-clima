
import './PanelClima.scss';
import React, { useEffect, useState } from "react";
import getClima from "../../services/getClima";
import getPrediccion from "../../services/getPrediccion";
import Form from '../Form/Form';
import CardClima from '../CardClima/CardClima'
import CardPredriccion from '../CardPrediccion/CardPrediccion';


export default function PanelClima () {

  const [clima, setClima] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);
  const [localizacion, setLocalizacion] = useState('');

  const getInfo = async (loc) => {
    setCargando(true);
    setMostrar(true)
    getClima(loc)
      .then(dataClima => {
        setClima(dataClima);      
        setCargando(false)        
      })
      .catch(error => {
        setCargando(false);
        setError(true)
      });

    getPrediccion(loc)
      .then(dataPrediccion => {
        setPrediccion(dataPrediccion);
        console.log(dataPrediccion)
      })
      .catch(error => {
        setCargando(false);
        setError(true)
      });
  }

  useEffect(()=>{
    
  }, [])

  return(
    <div className="panel-clima">
      <Form 
        newLocalizacion = {getInfo}
      />      
      {           
      mostrar 
        ? 
        <React.Fragment>
          <CardClima 
            clima={clima}
            cargando={cargando}
            error={error}
          /> 
          <CardPredriccion />
        </React.Fragment>
        : ''
      }
    </div>
  )
}