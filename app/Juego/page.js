"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import Input from "./../Components/Input";
import Bandera from "./../Components/Bandera";
import styles from './juego.module.css';
import Button from "../Components/Button";
import Pista from "../Components/Pista";
import Timer from "../Components/Timer";

export default function Home() {
  const [banderaElegida, setBanderaElegida] = useState({});
  const [banderas, setBanderas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [update, setUpdate] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const updateFlag = () => {
    const randomIndex = Math.floor(Math.random() * banderas.length);
    setBanderaElegida(banderas[randomIndex]);
  };

  useEffect(()=> {
    updateFlag();
  }, [update])

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then(response => {
        const data = response.data["data"];
        setBanderas(data);
        setBanderaElegida(data[Math.floor(Math.random() * data.length)]); // Inicializa la primera bandera
      })
      .catch(error => {
        console.error("Error fetching flags:", error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}>
        <h1>FLAGPARDY</h1>
        <Button sendText={"Guardar Puntuación"} bgColor={'#ff731c'}/>
      </div>

      <Bandera url={banderaElegida.flag || "https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"}/>

      <Timer onTimeUp={updateFlag} onTimeRemaining={setTiempoRestante}/>
      <Input 
        iPlaceholder={"¿A qué país pertenece la bandera?"} 
        sendText={"Enviar"} 
        banderaElegida={banderaElegida} 
        setPuntos={setPuntos} 
        setUpdate={setUpdate}
        puntos={puntos}
      />
      <h5 className={styles.puntos}> Puntos: {puntos}</h5>
    </main>
  );
}
