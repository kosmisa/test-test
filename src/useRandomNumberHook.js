import { useState, useEffect } from "react";

function useRandomNumbers(length, range) {
  const [error, setError] = useState("");

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
      }, 3000);
    });
  };
  const [hookAsyncData, setHookAsyncData] = useState(generator());

  const medianValue = () => {
    debugger;
    const arr = hookAsyncData;
    const sorted = arr.sort((a, b) => a - b);
    let median = null;

    if (sorted.length % 2 === 0) {
      median = (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2;
    } else {
      median = sorted[(sorted.length - 1) / 2];
    }

    return median;
  };

  const fetchMedian = () => {
    const reuslt = medianValue();
    if (reuslt < 5) {
      throw new Error("Error median value is less than 5!");
    } else {
      return reuslt;
    }
  };

  const handleClick = () => {
    fetchNum().then((value) => {
      setHookAsyncData(value);
    });
  };

  useEffect(() => {
    try {
      fetchMedian();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }, [hookAsyncData]);

  return [hookAsyncData, error, handleClick];
}

export default useRandomNumbers;
