import { is } from "../utils";

type Storage = Record<string, string | number | (string | number | object)[]>;

type MusicDrawerStorage = {
  musicDrawer: number[];
};

export const musicDrawerStorage = createLocalStorage<MusicDrawerStorage>({
  musicDrawer: [],
});

function createLocalStorage<T extends Storage>(object: T) {
  const keys = Object.keys(object);
  const values = Object.values(object);

  Object.entries(object).forEach(([key, value]) => {
    if (!localStorage.getItem(key)) {
      let stringifyValue;

      if (typeof value === "number" || typeof value === "object") {
        stringifyValue = JSON.stringify(value);
      } else {
        stringifyValue = value;
      }

      localStorage.setItem(key, stringifyValue);
    }
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
    if (is.string(object[key])) {
      return localStorage.getItem(key as string);
    } else {
      return JSON.parse(localStorage.getItem(key as string) || "");
    }
  };

  return { set, get, keys, values };
}
