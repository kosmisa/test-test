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

  const allNumbersArr = [...data, ...asyncData];
  const filter = [...new Set(allNumbersArr)];
  // const filteredNumbersArr = Array.from(filter);
  const sorting = filter.sort((a, b) => a - b);

  const sortedNumbersArr = [sorting].map((number) => {
    return <p key={number}>{number}</p>;
  });

  return (
    <>
      {sortedNumbersArr.map((number) => {
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
