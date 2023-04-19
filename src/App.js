// import "./App.css";
// Treba 2 funkcije getData koja je sinhrona i vraca 20 random brojeva vrednosti izmedju 1 i 10.
// Druga funkcija je getAsyncData koja isto vraca 20 random brojeva izmedju 1 i 10 ali kroz 2 sekunde (i treba da ide preko promis-a)
// Sada ova dva arraya is getData i getAsyncData ubaciti u state komponente i prikazati ta dva array-a kao niz paragrafa <p></p> 1 broj 1 paragraf!

import { Fragment, useState, useEffect } from "react";

function App() {
  const [asyncData, setAsyncData] = useState([]);

  useEffect(() => {
    getAsyncData().then((value) => {
      setAsyncData(value);
    });
  }, []);

  const getData = () => {
    const arrOfRandomNumbers = [];

    for (let i = 0; i < 20; i++) {
      const randomNumbers = Math.floor(Math.random() * 10 + 1);
      arrOfRandomNumbers.push(randomNumbers);
    }
    return arrOfRandomNumbers;
  };

  const [data, setData] = useState(getData());

  const getAsyncData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getData());
      }, 2000);
    });
  };

  const allNumbersArr = [...data, ...asyncData].map((number) => {
    return <p key={number}>{number}</p>;
  });

  return (
    <>
      {allNumbersArr.map((number) => {
        return (
          <Fragment>
            <p>{number}</p>
          </Fragment>
        );
      })}
    </>
  );
}

export default App;
