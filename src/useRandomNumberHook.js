import { useState, useEffect } from "react";

function useRandomNumbers(length, range) {
  const [hookAsyncData, setHookAsyncData] = useState([]);
  const [error, setError] = useState(null);

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

    if (median < 5) {
      setError("median is less than 5!");
    } else {
      setError(null);
    }

    return median;
  }

  useEffect(() => {
    generator().then((value) => {
      setHookAsyncData(value);
    });
  }, [length, range]);

  useEffect(() => {
    medianValue();
  }, [hookAsyncData]);

  //   useEffect(() => {
  //     const generateNumbers = async () => {
  //       try {

  //         setHookAsyncData(generator);
  //         if (medianValue < 5) {
  //           throw new Error("Median value is less than 5!");
  //         }
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     };

  //     generateNumbers();
  //   }, [length, range]);

  return [hookAsyncData, error];
}

export default useRandomNumbers;
