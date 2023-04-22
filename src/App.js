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
  const sorting = filter.sort((a, b) => a - b);
  
  const sortedNumbersArr = sorting.map((number) => {
    return <p key={number}>{number}</p>;
  });
  //***************************************************************************/
  function useRandomNumbers(length, range) {
    const [hookAsyncData, setHookAsyncData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      async function fetchData(){
        try{
          setIsLoading
        }
      }
    }, [length, range]);

    async function generator() {
      const newArr = [];

      for (let i = 0; i < length; i++) {
        const randomNumbers = Math.floor(Math.random() * range + 1);
        newArr.push(randomNumbers);
      }
      return newArr;
    }

    async function medianValue() {
      const initialValue = 0;
      const sum = hookAsyncData.reduce(
        (accumulator, currentValue) => currentValue + accumulator,
        initialValue
      );

      const median = sum / hookAsyncData.length;

      return median;
    }

    // useEffect(() => {
    //   async function fetch() {
    //     await generator();
    //   }
    //   fetch();
    // }, [length, range]);


    return hookAsyncData;
  }

  const customHookArr = useRandomNumbers(9, 5);
  const hookArr = customHookArr.map((number) => {
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
      {hookArr.map((number) => {
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
