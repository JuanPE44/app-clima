
import './Prediccion.scss';

export default function Prediccion ( { img, tempMax, tempMin, dia, cambiarDia, arrayDia }) {

  return (
    <li className='prediccion' onClick={()=> cambiarDia(arrayDia)}>
      <div className='header-prediccion'>
        <div className='prediccion-dia'>{dia}</div>     
        {       
        <img src={require(`../../assets/imgs/${img}.png`)} alt={img} />        
        }
      </div>   
      <div className='prediccion-temperatura'>
        <div className='tempMax'>{tempMax}</div>    
        <div className='tempMin'>{tempMin}</div>            
      </div> 
    </li>
  );
}