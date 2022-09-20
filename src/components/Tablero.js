import React, { useEffect, useState } from "react";
import "../App.css";
import Images from "./imagenes";
import BackImage from "../images/back.png";

function Tablero() {
  const [ImagenesBarajadas, setImagenesBarajadas] = useState(null);
  const [ImagenesMostradas, setImagenesMostradas] = useState(null);
  const [contador, setContador] = useState(1);
  const [anterior, setAnterior] = useState(-1);
  const [clickEnabled, setClickEnabled] = useState(true);

  useEffect(() => {
    let aux = Images.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setImagenesBarajadas(aux);
    setImagenesMostradas([
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
      BackImage,
    ]);
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function handleImageClick(index) {
    if (clickEnabled) {
      let aux = [...ImagenesMostradas];
      aux[index] = ImagenesBarajadas[index];
      setImagenesMostradas(aux);
      setContador(contador - 1);

      if (contador === 0) {
        setClickEnabled(false);
        console.log(ImagenesBarajadas[index], ImagenesBarajadas[anterior]);
        setContador(1);
        await sleep(1000);
        if (ImagenesBarajadas[index] !== ImagenesBarajadas[anterior]) {
          let aux = [...ImagenesMostradas];
          aux[index] = BackImage;
          aux[anterior] = BackImage;
          setImagenesMostradas(aux);
        }
        setClickEnabled(true);
      } else {
        setAnterior(index);
      }
    }
  }

  return (
    <div className="tablero">
      {ImagenesMostradas !== null &&
        ImagenesMostradas.map((image, index) => {
          return (
            <div className="image">
              <img src={image} onClick={() => handleImageClick(index)} />
            </div>
          );
        })}
    </div>
  );
}

export default Tablero;
