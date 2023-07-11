import numberGenerator from "./number_gerator";

const getAsyncData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(numberGenerator());
    }, 2000);
  });
};

export default getAsyncData;
