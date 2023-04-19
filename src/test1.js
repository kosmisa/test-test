// import "./App.css";
// Treba 2 funkcije getData koja je sinhrona i vraca 20 random brojeva vrednosti izmedju 1 i 10.
// Druga funkcija je getAsyncData koja isto vraca 20 random brojeva izmedju 1 i 10 ali kroz 2 sekunde (i treba da ide preko promis-a)
// Sada ova dva arraya is getData i getAsyncData ubaciti u state komponente i prikazati ta dva array-a kao niz paragrafa <p></p> 1 broj 1 paragraf!

import { useEffect, useState } from "react";
import { Fragment } from "react";

function App() {
  const [data, setData] = useState([]);
  const [asyncData, setAsyncData] = useState([]);

  useEffect(() => {
    getData();
    getAsyncData().then((newData) => {
      setAsyncData(newData);
    });
  }, []);

  function getData() {
    const arrOfRandomNumbers = [];

    for (let i = 0; i < 20; i++) {
      const randomNumber = Math.floor(Math.random() * (10 - 1) + 1); // Ovu funkciju razjasniti
      arrOfRandomNumbers.push(randomNumber);
    }
    setData(arrOfRandomNumbers);
  }

  //Pravi ovo preko promis-a - i treba da ima callback f-ju?
  // const getAsyncData = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(getData());
  //   }, 2000);
  //   // try{
  //   // } catch (error) {
  //   //   reject(error);
  //   // }
  // });

  // const getAsyncData = () => { *************************************<<<<<<<<<<<<<<<<<<<<<
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(getData);
  //     }, 2000);
  //   });
  // };

  const getAsyncData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arrOfRandomNumbers = [];

        for (let i = 0; i < 20; i++) {
          const randomNumber = Math.floor(Math.random() * (10 - 1) + 1);
          arrOfRandomNumbers.push(randomNumber);
        }
        resolve(arrOfRandomNumbers);
      }, 2000);
    });
  };

  const syncDataList = data.map((number) => {
    return <p key={number}>{number}</p>;
  });

  const asyncList = asyncData?.map((number) => {
    return <p key={number}>{number}</p>;
  });

  const allDataList = [...data, ...asyncData].map((number) => {
    return <p key={number}>{number}</p>;
  });

  return (
    <>
      {/* <button onClick={getData}>
        Kolko puta sam modifikovao kod dok nije proradio?
      </button>
      <button onClick={getAsyncData}>Mozda radim?</button> */}
      {/* {syncDataList.map((number) => (
        <Fragment key={number}>
          <p>{number}</p>
        </Fragment>
      ))} */}
      {allDataList.map((number) => {
        return (
          <Fragment>
            {" "}
            <p>*{number}</p>{" "}
          </Fragment>
        );
      })}
    </>
  );
}

export default App;
