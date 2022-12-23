
import './Hora.scss'

export default function diaHora ({ hora, temp, img }) {
  return (
    <div className='hora'>
      <div className='divHora'>{hora}</div>
      <img src={require(`../../assets/imgs/${img}.png`)} />
      <div className='hora-temp'>{temp}</div>
    </div>
  )
}