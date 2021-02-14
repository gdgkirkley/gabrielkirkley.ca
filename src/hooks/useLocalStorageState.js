import * as React from "react";

function useLocalStorageState(
  key,
  initialValue,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    if (typeof window === `undefined`) return initialValue;

    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }

    window.localStorage.setItem(key, serialize(state));
    setState(state);
  }, [key, state, serialize]);

  return [state, setState];
}

export default useLocalStorageState;
