
import './Hora.scss'

export default function diaHora ({ hora, temp, img }) {
  return (
    <div className='hora'>
      <div>{hora}</div>
      <img src={require(`../../assets/imgs/${img}.png`)} />
      <div>{temp}</div>
    </div>
  )
}