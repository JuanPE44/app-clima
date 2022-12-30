
import Hora from '../Hora/Hora';
import './CardHoras.scss'

export default function CardHoras({ diaHoras, mostrarHoras, claseAnimacion }) {
  return (
    <div className={`card-horas ${claseAnimacion}`}>
      <ul className='contenedor-horas'>
        {
          diaHoras.map(diaHora => {
            let [fecha, hora] = diaHora.dt_txt.split(' ')
            return (
              <Hora
                key={diaHora.dt_txt}
                hora={hora.slice(0, 5)}
                fecha={fecha}
                temp={Math.floor(diaHora.main.temp)}
                img={diaHora.weather[0].main}               
                viento={diaHora.wind.speed}
                humedad={diaHora.main.humidity}
              />
            )
          })
        }
      </ul>
    </div>
  )

}