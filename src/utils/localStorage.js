export const setStorage = (key, value, type = "string") => {
  try {
    let valueToStore = value;
    if (typeof value === "object") valueToStore = JSON.stringify(value);

    localStorage.setItem(key, valueToStore);
  } catch (error) {
    localStorage.setItem(key, valueToStore);
  }
};

export const getStorage = (key, type) => {
  try {
    let value = localStorage.getItem(key);
    if (type === "object") value = JSON.parse(value);
    return value;
  } catch (error) {
    console.log("Error in get storage :: ", error);
  }
};

export const clearStorage = () => {
  localStorage.clear()
}

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log("Error in remove storage :: ", error);
  }
}
