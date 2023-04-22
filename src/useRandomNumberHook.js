import { useState, useEffect } from "react";

function useRandomNumbers(length, range) {
  const [hookAsyncData, setHookAsyncData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateNumbers = async () => {
      try {
        const generator = () => {
          const newArr = [];

          for (let i = 0; i < length; i++) {
            const randomNumbers = Math.floor(Math.random() * range + 1);
            newArr.push(randomNumbers);
          }
          return newArr;
        };
        const medianValue = () => {
          const initialValue = 0;
          const sum = hookAsyncData.reduce(
            (accumulator, currentValue) => currentValue + accumulator,
            initialValue
          );
          const median = sum / hookAsyncData.length;
          return median;
        };
        if (medianValue < 5) {
          throw new Error("Median value is less than 5!");
        }
        setHookAsyncData(generator);
      } catch (error) {
        setError(error.message);
      }
    };

    generateNumbers();
  }, [length, range]);

  return [hookAsyncData, error];
}

export default useRandomNumbers;
