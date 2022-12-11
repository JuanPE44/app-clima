
const api = {
	key: '1f27797b265b3c30b73540515f6358e6',
	base: 'http://api.openweathermap.org/data/2.5/'
}

export default function getPrediccion (ciudad) {
  return fetch(`${api.base}forecast?q=${ciudad}&units=metric&APPID=${api.key}&lang=sp`)
    .then((response) => {
      if(!response.ok) throw {response}
      return response.json();
    })
}
