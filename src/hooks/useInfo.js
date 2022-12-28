import getPrediccion from "../services/getPrediccion";
import getClima from "../services/getClima";
import { useEffect, useState } from "react";

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

export function useInfo ( loc ) {

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

  const [clima, setClima] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState([])

  useEffect(()=> {
    if(loc==='')return
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
        setCargando(false)
        setClima(data);
        setError(false)
      })
      .catch(error => {
        setCargando(false);
        setError(true)
      });    
  }, [loc])
  return { clima, prediccion, mostrar, cargando, error }
}