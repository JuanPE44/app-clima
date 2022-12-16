
import './Prediccion.scss';

const DIAS = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

export default function Prediccion ( { img, tempMax, tempMin, dia }) {
  /*
  let date = new Date(fechaHora);
  let indexDia = date.getDay();
  let dia = DIAS[indexDia];
  let [fecha, hora] = fechaHora.split(' ')
  */
  return (
    <li className='prediccion'>
      <div className='header-prediccion'>
        <div className='prediccion-dia'>{dia}</div>     
        <img src={require(`../../assets/imgs/${img}.png`)} />
      </div>   
      <div className='prediccion-temperatura'>
        <div className='tempMax'>{tempMax}</div>    
        <div className='tempMin'>{tempMin}</div>            
      </div> 
    </li>
  );
}