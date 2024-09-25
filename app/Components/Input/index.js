import styles from "./Input.module.css";
import { useState } from "react";

export default function Input({ iPlaceholder, sendText, setUpdate, banderaElegida, setPuntos, puntos }) {
    const [rta, setRta] = useState("");

    const submit = (e) => {
      if (banderaElegida !== undefined) {
          if (rta.toLowerCase().trim() === banderaElegida.name.toLowerCase().trim()) {
              setPuntos(puntos + 10);
          } else {
              setPuntos(puntos - 1 >= 0 ? puntos - 1 : 0); 
          }
          setUpdate(puntos);
          setRta("");
      }
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type="text"
                autoComplete="off"
                placeholder={iPlaceholder}
                onChange={e => { setRta(e.currentTarget.value); }}
            />
            <button className={styles.boton} onClick={submit}>{sendText}</button>
        </div>
    );
}
