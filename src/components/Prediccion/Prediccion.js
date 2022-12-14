
import './Prediccion.scss';

const DIAS = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

export default function Prediccion ( { img, temperatura, fechaHora }) {
  let date = new Date(fechaHora);
  let indexDia = date.getDay();
  let dia = DIAS[indexDia];
  let [fecha, hora] = fechaHora.split(' ')
  
  return (
    <div className='prediccion'>
      <div className='header-prediccion'>
        <div className='prediccion-dia'>{dia}</div>     
        <img src={require(`../../assets/imgs/${img}.png`)} />
      </div>   
      <div className='prediccion-temperatura'>{temperatura}</div>      
      <div className='prediccion-hora'>{hora.slice(0,5)}HS</div>
    </div>
  );
}