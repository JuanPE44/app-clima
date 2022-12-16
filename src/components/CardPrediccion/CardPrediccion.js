
import './CardPrediccion.scss';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Prediccion from '../Prediccion/Prediccion';
import { useEffect, useState } from 'react';

const DIAS = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
let nada;
export default function CardPredriccion ({ prediccion, cargando, error }) { 
  const [dias, setDias] = useState([]);

  const separarDias = (arrayDias) => {
    let diasSeparados = [];
    let horas = [];
    let indexDia;
    arrayDias.forEach((d, index) => {
      let date = new Date(d.dt_txt);
      if(index === 0) {indexDia = date.getDay(date)}
      if(indexDia !== date.getDay(date)) {
        diasSeparados.push({dia: DIAS[indexDia], horas})
        indexDia = date.getDay(date);
        horas = [];
      }
      horas.push(d);
      if(index === 39) {diasSeparados.push({dia: DIAS[indexDia], horas})}
    })
    return diasSeparados;
  }

  const obtenerTemperaturas = (dia) => {
    let temperaturas = [];
    dia.forEach(hora => {
      temperaturas.push(hora.main.temp)
    })    
    let tempMax = Math.round(Math.max(...temperaturas));
    let tempMin = Math.round(Math.min(...temperaturas));
    return [tempMax, tempMin];
  }

  useEffect(()=> {
    if(!cargando) {
      setDias(separarDias(prediccion.list))
    }
  }, [cargando])

  return (
    <div className='card-prediccion'>
      <ul className='contenedor-predicciones'>
        {          
          cargando ? <Spinner /> : 
          error ? <Error errorInfo={error}/> :
          dias.map(dia => {            
            let img = dia.horas[0].weather[0].main;
            const [tempMax, tempMin] = obtenerTemperaturas(dia.horas)
            return(             
              <Prediccion 
                key={dia.dia}
                dia={dia.dia}
                img={img}
                tempMax={tempMax}
                tempMin={tempMin}
              />             
            )
            
          })                   
        } 
      </ul>
    </div>
  )
}