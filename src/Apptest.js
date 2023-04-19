// import "./App.css";
// Treba 2 funkcije getData koja je sinhrona i vraca 20 random brojeva vrednosti izmedju 1 i 10.
// Druga funkcija je getAsyncData koja isto vraca 20 random brojeva izmedju 1 i 10 ali kroz 2 sekunde (i treba da ide preko promis-a)
// Sada ova dva arraya is getData i getAsyncData ubaciti u state komponente i prikazati ta dva array-a kao niz paragrafa <p></p> 1 broj 1 paragraf!

import { Fragment, useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [asyncData, setAsyncData] = useState([]);

  useEffect(() => {
    setData(getData());
    //Sa ovim delom nije htelo da mi radi i ne razumem bas najbolje zasto
    //Moj odgovor koji me je naveo da uradim ovo ispod je: Promis je Object znaci key-value pair key mi je idex za array u tom objectu stoga ja trebam da pushujem to u novi array kako bih koristio map
    // getAsyncData().then((value) => {
    //   setAsyncData(value);
    // });
    getAsyncData().then((value) => {
      //   const newRandomArr = [];
      //   newRandomArr.push(value);
      setAsyncData(value);
    });
  }, []);

  const getData = () => {
    const arrOfRandomNumbers = [];

    for (let i = 0; i < 20; i++) {
      const randomNumbers = Math.floor(Math.random() * 10 + 1);
      arrOfRandomNumbers.push(randomNumbers);
    }
    // setData(arrOfRandomNumbers);
    return arrOfRandomNumbers;
  };

  //Ovako sam i juce radio i jebalo me je u krug samo tako dok nisam uzeo i ispisao na drugaciji nacin meni nije jasno sto ovo ne radi kao ono drugo...
  //   const getAsyncData = () => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         const generate = getData();
  //         resolve(generate);
  //       }, 2000);
  //     });
  //   };

  //Dok sam sve ovo pisao palo mi je na pamet da ovo iznad za asnycData nije radli kako treba tj prepisivalo mi je array zato sto sam u getData kad pokrenem funkciju setovao state za data
  //Stoga bi za 2 sekunde ponovo setovao samo DATA a ne async data jer mi je get asny zvalo tu funkciju stoga znaci trebam nekako da odvojim i napravio sam ovo medjutim sada nece ovo asnyc da mi renderuje lepo
  // const getAsyncData = () => { ***** POGRESNO ******
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const arr = [];
  //       const newData = getData();
  //       arr.push(newData);
  //       resolve(arr);
  //     }, 2000);
  //   });
  // };

  //ISPRAVLJENO
  const getAsyncData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getData());
      }, 2000);
    });
  };

  //Ideja je bila posle hiljadu nacina da napravim dve varijable koje ce lepo da imaju data podatke i asyncData da to stampa zasebno u p. Za sada nisam uspeo da nadjem nacin da to proradi
  // Onda sam uzeo i reko aj sve da bude jedan array. Medjutim ni to nije htelo prvo da radi jer mi nije jasno zasto sam morao dva puta da zovem map u allNumbers i dole gde renderujem??? Zar nije bio dovoljlan jedan samo?
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
