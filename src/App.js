import { useState, useEffect, useCallback } from "react";
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
  //Task 5 ************************************************
  const [input, setInput] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const allData = [...sortedNumbers, ...hookAsyncData];

  function debounce(cb, delay = 1000) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const filterFunction = () => {
    const filter = allData.filter((num) => num == input);
    return filter;
  };

  const invokeDebouncedValidation = useCallback(
    debounce(() => {
      setFilteredData(filterFunction());
    }, 500),
    [input, allData]
  );

  const filterMap = filteredData.map((number) => {
    return <p key={number}>{number}</p>;
  });

  const initiateSearchParam = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    invokeDebouncedValidation();
  });

  return (
    <>
      <p>
        <label>
          <input
            placeholder="Enter a number you want to find"
            type="number"
            value={input}
            onChange={initiateSearchParam}
          />
        </label>
      </p>
      {input ? (
        filterMap.map((number) => <p>{number}</p>)
      ) : (
        <p> No result found </p>
      )}
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
