
import './PanelClima.scss';
import React, { useState } from "react";
import getClima from "../../services/getClima";
import getPrediccion from "../../services/getPrediccion";
import Form from '../Form/Form';
import CardClima from '../CardClima/CardClima'
import CardPredriccion from '../CardPrediccion/CardPrediccion';
import {useLocation} from 'wouter';


export default function PanelClima () {

  const [clima, setClima] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [cargaClima, setCargaClima] = useState(false);
  const [cargaPrediccion, setCargaPrediccion] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);
  const [path, pushLocation] = useLocation();

  const getInfo = async (loc) => {
    pushLocation(`/${loc}`)
    setCargaClima(true);
    setCargaPrediccion(true);    
    setMostrar(true)
    getClima(loc)
      .then(dataClima => {
        setClima(dataClima);      
        setCargaClima(false)  
        setError(false)            
      })
      .catch(error => {
        setCargaClima(false);
        setError(true)
      });

    getPrediccion(loc)
      .then(dataPrediccion => {
        setCargaPrediccion(false)
        setPrediccion(dataPrediccion);
        setError(false)
        console.log(dataPrediccion)  
      })
      .catch(error => {
        cargaPrediccion(false);
        setError(true)
      });
  }

  return(
    <div className="panel-clima">
      <Form 
        newLocalizacion = {getInfo}
      />      
      {           
      mostrar ? (
          <>
            <CardClima 
              clima={clima}
              cargando={cargaClima}
              error={error}
            />            
            <CardPredriccion
              prediccion={prediccion}
              cargando={cargaPrediccion}
              error={error}
            />
          </>
      ) : ''
      }
    </div>
  )
}