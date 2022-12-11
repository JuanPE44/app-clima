

import './Form.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export default function Form ({newLocalizacion}) {

  const [ciudad, setCiudad] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if(ciudad === '' || !ciudad) return;
    newLocalizacion(ciudad);
  }

  return (
    <form onSubmit={onSubmit} className='form'> 
      <FontAwesomeIcon icon={faLocationDot} className='form-icono'/>
      <input type='text' placeholder='Ingrese la ciudad' onChange={(e) => setCiudad(e.target.value)} className='form-input'/>
      <button className='form-boton'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='boton-icono'/>
      </button>
    </form>   
  );
}

