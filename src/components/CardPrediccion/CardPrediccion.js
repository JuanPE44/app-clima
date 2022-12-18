
import './CardPrediccion.scss';
import Prediccion from '../Prediccion/Prediccion';


export default function CardPredriccion ({ prediccion, error, cambiarDia }) {

  const obtenerTemperaturas = (dia) => {
    let temperaturas = [];
    dia.forEach(hora => {
      temperaturas.push(hora.main.temp)
    })    
    let tempMax = Math.round(Math.max(...temperaturas));
    let tempMin = Math.round(Math.min(...temperaturas));
    return [tempMax, tempMin];
  }


  return (
    <div className='card-prediccion'>
      <ul className='contenedor-predicciones'>
        {                    
          error ? <h5>Predicciones no encontradas :'/</h5> : (
            prediccion.map(dia => {            
              let img = dia.horas[0].weather[0].main;
              const [tempMax, tempMin] = obtenerTemperaturas(dia.horas)
              return(             
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
      </ul>
    </div>
  )
}