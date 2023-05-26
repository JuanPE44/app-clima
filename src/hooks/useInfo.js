import getPrediccion from "../services/getPrediccion";
import getClima from "../services/getClima";
import { useEffect, useState } from "react";
import { separarDias } from "../utilities/separarDias";

export function useInfo(loc) {
  const [dia, setDia] = useState({ dia: "nose", horas: [] });
  const [clima, setClima] = useState([]);
  const [prediccion, setPrediccion] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState([]);

  useEffect(() => {
    if (loc === "") return;
    setCargando(true);
    setMostrar(true);

    getPrediccion(loc)
      .then((dataPrediccion) => {
        setCargando(false);
        setPrediccion(separarDias(dataPrediccion.list));
        setDia(separarDias(dataPrediccion.list)[0]);
        setError(false);
      })
      .catch((error) => {
        setCargando(false);
        setError(true);
      });

    getClima(loc)
      .then((data) => {
        setCargando(false);
        setClima(data);
        setError(false);
      })
      .catch((error) => {
        setCargando(false);
        setError(true);
      });
  }, [loc]);
  return { clima, prediccion, mostrar, cargando, error, dia, setDia };
}
