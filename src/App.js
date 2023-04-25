import { useState, useEffect } from "react";
import useRandomNumbers from "./useRandomNumberHook";

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

  const combinedData = [...data, ...asyncData];
  const uniqueNumbers = [...new Set(combinedData)];
  const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

  const sortedNumberElements = sortedNumbers.map((number) => {
    return <p key={number}>{number}</p>;
  });

  const [length, setLength] = useState(20);
  const [range, setRange] = useState(10);
  const [hookAsyncData, error, handleClick] = useRandomNumbers(length, range);

  const changeLength = (event) => {
    setLength(event.target.value);
  };
  const changeRange = (event) => {
    setRange(event.target.value);
  };

  const hookArr = hookAsyncData.map((number) => {
    return <p key={number}>{number}</p>;
  });

  return (
    <>
      <p>
        <label>
          Search number: <input name="myInput" />
        </label>
      </p>
      {sortedNumberElements.map((number) => {
        return <p>{number}</p>;
      })}
      <p>
        <label>
          <input
            placeholder="Enter Length"
            type="number"
            value={length}
            onChange={changeLength}
          ></input>
          <input
            placeholder="Enter Range"
            type="number"
            value={range}
            onChange={changeRange}
          ></input>
        </label>
      </p>
      <button onClick={handleClick}>Regenerate Numbers</button>
      {hookArr.map((number) => {
        return <p>{number}</p>;
      })}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
