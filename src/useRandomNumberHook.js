import { useState, useEffect } from "react";
import numberGenerator from "./number_gerator";

function useRandomNumbers(length, range) {
  const [error, setError] = useState("");

  const fetchNum = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(numberGenerator(length, range));
      }, 3000);
    });
  };
  const [hookAsyncData, setHookAsyncData] = useState(
    numberGenerator(length, range)
  );

  const medianValue = () => {
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
