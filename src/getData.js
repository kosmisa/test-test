import numberGenerator from "./number_gerator";

function getData() {
  const numbers = numberGenerator();
  return numbers;
}

export default getData;
