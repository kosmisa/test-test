import { useState, useEffect, useCallback, useRef } from "react";
import useRandomNumbers from "./useRandomNumberHook";
import getData from "./getData";
import getAsyncData from "./getAsyncData";
import { mapArrayValuesToUniqueIds } from "./keys";
import "./index.css";

function App() {
  const [data, setData] = useState(() => getData()); // lazy init
  const [asyncData, setAsyncData] = useState([]);
  // const [uniqueKeyArr, setuniqueKeyArr] = useState([]);
  const paragraphRefs = useRef([]);

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
  const sortedNumberElements = Array.from(
    mapArrayValuesToUniqueIds(sortedNumbers).entries()
  ).map(([key, value]) => {
    const ref = useRef(null);
    paragraphRefs.current[key] = ref;
    return (
      <p key={key} className="number-paragraph" ref={ref}>
        <span>{value}</span>
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

  const hookArr = hookAsyncData.map((number) => {
    const ref = useRef(null);
    paragraphRefs.current.push(ref);
    return (
      <p key={number} className="number-paragraph" ref={ref}>
        <span>{number}</span>
      </p>
    );
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
    highlightNumbers(event.target.value);
  };

  const highlightNumbers = (inputValue) => {
    // paragraphs = document.querySelectorAll('.number-paragraph');

    // paragraph.forEach
    paragraphRefs.current.forEach((ref) => {
      const paragraph = ref.current;
      const number = paragraph.querySelector("span");
      if (number === inputValue) {
        paragraph.classList.add("highlighted");
      } else {
        paragraph.classList.remove("highlighted");
      }
    });
  };

  useEffect(() => {
    invokeDebouncedValidation();
  });

  return (
    <>
      <p>
        <label>
          <input
            ref={paragraphRefs}
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
      <p>************************</p>
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
