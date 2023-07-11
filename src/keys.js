export const mapArrayValuesToUniqueIds = (array) => {
  const arrayValuesToKeyMap = new Map();

  const randomizedUniqueId = () => {
    const id = Math.floor(Math.random() * array.length);
    if (arrayValuesToKeyMap.has(id)) {
      return randomizedUniqueId();
    }
    return id;
  };

  array.forEach((el, index) => {
    arrayValuesToKeyMap.set(randomizedUniqueId(), el);
  });
  return arrayValuesToKeyMap;
};
