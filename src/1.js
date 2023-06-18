import { useState, useEffect, useRef } from "react";
import useRandomNumbers from "./useRandomNumberHook";
import getData from "./getData";
import getAsyncData from "./getAsyncData";
import "./index.css";

function App() {
  const [data, setData] = useState(() => getData());
  const [asyncData, setAsyncData] = useState([]);
  const paragraphRefs = useRef([]);
  //test
  useEffect(() => {
    getAsyncData()
      .then((value) => {
        setAsyncData(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const combinedData = [...data, ...asyncData];
  const uniqueNumbers = [...new Set(combinedData)];
  const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
  const sortedNumberElements = sortedNumbers.map((value, index) => {
    return (
      <p
        key={value}
        className="number-paragraph"
        ref={(element) => (paragraphRefs.current[index] = element)}
      >
        {value}
      </p>
    );
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

  const hookArr = hookAsyncData.map((number, index) => {
    return (
      <p
        key={number}
        className="number-paragraph"
        ref={(element) =>
          (paragraphRefs.current[index + sortedNumbers.length] = element)
        }
      >
        <span>{number}</span>
      </p>
    );
  });

  const [input, setInput] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const allData = [...sortedNumbers, ...hookAsyncData];

  const filterFunction = () => {
    const filter = allData.filter((num) => num == input);
    return filter;
  };

  let debounceTimeout;
  const debounce = (cb, delay = 1000) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      cb();
    }, delay);
  };

  const invokeDebouncedValidation = () => {
    debounce(() => {
      const filtersss = filterFunction();
      setFilteredData(filtersss);
    }, 500);
  };

  useEffect(() => {
    invokeDebouncedValidation();
  }, [input, allData]);

  const filterMap = filteredData.map((number) => {
    return <p key={number}>{number}</p>;
  });

  const initiateSearchParam = (event) => {
    setInput(event.target.value);
    highlightNumbers(event.target.value);
  };

  const highlightNumbers = (inputValue) => {
    const parsedInput = parseInt(inputValue);
    paragraphRefs.current.forEach((ref, index) => {
      const number = allData[index];
      if (number === parsedInput) {
        ref.classList.add("highlighted");
      } else {
        ref.classList.remove("highlighted");
      }
    });
  };

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
      {input ? filterMap : <p> No result found </p>}
      <p>************************</p>
      {sortedNumberElements}
      {hookArr}
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
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
