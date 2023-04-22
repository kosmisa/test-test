import { useState, useEffect } from "react";

function useRandomNumbers(length, range) {
  const [hookAsyncData, setHookAsyncData] = useState([]);
  const [error, setError] = useState(null);

  const generator = () => {
    const newArr = [];

    for (let i = 0; i < length; i++) {
      const randomNumbers = Math.floor(Math.random() * range + 1);
      newArr.push(randomNumbers);
    }
    return newArr;
  };

  const fetchNum = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(generator());
      }, 0);
    });
  };

  const medianValue = () => {
    const arr = generator();
    const sorted = arr.sort((a, b) => a - b);
    let median = null;

    let i = 0;
    let j = sorted.length - 1;

    if (sorted.length / 2 === Math.round(sorted.length / 2)) {
      while (i < j) {
        i += 1;
        j -= 1;
        median = (sorted[i] / 2 + sorted[j] / 2 + 1) / 2;
      }
    } else {
      while (i <= j) {
        i += 1;
        j -= 1;
        median = (sorted[i] + 1) / 2;
      }
    }

    return median;
  };

  const fetchMedian = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value = medianValue();
        if (value < 5) {
          reject(new Error("Error median value is less than 5!"));
        } else {
          resolve(value);
        }
      }, 0);
    });
  };

  useEffect(() => {
    fetchNum().then((value) => {
      setHookAsyncData(value);
    });
  }, [length, range]);

  const handleClick = () => {
    fetchNum().then((value) => {
      setHookAsyncData(value);
    });
  };

  useEffect(() => {
    fetchMedian()
      .then((value) => {
        setError(value);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [hookAsyncData]);

  return [hookAsyncData, error, handleClick];
}

export default useRandomNumbers;
