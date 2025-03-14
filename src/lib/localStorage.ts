type Key = string;
type Value = string | number | (string | number | object)[];

type ValueObject = Record<Key, Value>;

type MusicListStorage = {
  age: number;
};

export const musicListStorage = createLocalStorageImpl<MusicListStorage>({
  age: 27,
});

function createLocalStorageImpl<T extends ValueObject>(object: T) {
  const keys = Object.keys(object);
  const values = Object.values(object);

  Object.entries(object).forEach(([key, value]) => {
    let stringifyValue;

    if (typeof value === "number" || typeof value === "object") {
      stringifyValue = JSON.stringify(value);
    } else {
      stringifyValue = value;
    }

    localStorage.setItem(key, stringifyValue);
  });

  const set = (newObject: T) => {
    Object.entries(newObject).forEach(([key, value]) => {
      let stringifyValue;

      if (typeof value === "number" || typeof value === "object") {
        stringifyValue = JSON.stringify(value);
      } else {
        stringifyValue = value;
      }

      localStorage.setItem(key, stringifyValue);
    });
  };

  const get = (key: keyof T) => {
    return localStorage.getItem(key as string);
  };

  return { set, get };
}
