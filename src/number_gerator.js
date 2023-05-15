const numberGenerator = (length = 20, range = 10) => {
  const arrOfRandomNumbers = [];

  for (let i = 0; i < length; i++) {
    const randomNumbers = Math.floor(Math.random() * range + 1);
    arrOfRandomNumbers.push(randomNumbers);
  }
  return arrOfRandomNumbers;
};

export default numberGenerator;
