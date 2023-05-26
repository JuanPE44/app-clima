
export const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const separarDias = (arrayDias) => {
  let diasSeparados = [];
  let horas = [];
  let indexDia;
  arrayDias.forEach((d, index) => {
    let date = new Date(d.dt_txt);
    if (index === 0) {
      indexDia = date.getDay(date);
    }
    if (indexDia !== date.getDay(date)) {
      diasSeparados.push({ dia: DIAS[indexDia], horas });
      indexDia = date.getDay(date);
      horas = [];
    }
    horas.push(d);
    if (index === 39) {
      diasSeparados.push({ dia: DIAS[indexDia], horas });
    }
  });
  return diasSeparados;
};
