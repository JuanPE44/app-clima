
import './CardPrediccion.scss';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import Prediccion from '../Prediccion/Prediccion';

export default function CardPredriccion ({ prediccion, cargando, error }) {

  console.log(prediccion)

  return (
    <div className='card-prediccion'>
      <div className='contenedor-predicciones'>
        {          
          cargando ? <Spinner /> : 
          error ? <Error errorInfo={error}/> :
          prediccion.list.map(p => {
            return (
              <Prediccion
                key={p.dt} 
                img={p.weather[0].main}
                temperatura={p.main.temp}
                fechaHora={p.dt_txt}
              />
            )
          })
          
          
        } 
      </div>
    </div>
  )
}