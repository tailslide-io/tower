import { matchPath, useLocation } from 'react-router-dom';

export const useRouteMatch = (patterns) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
};

export const objectsKeysSnakeToCamel = (objs) => {
  return objs.map(objectKeysSnakeToCamel);
};

export const objectKeysSnakeToCamel = (obj) => {
  return Object.entries(obj).reduce((formattedObj, [key, value]) => {
    const camelKey = key.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
    formattedObj[camelKey] = value;
    return formattedObj;
  }, {});
};

export const objectKeysCamelToSnake = (obj) => {
  return Object.entries(obj).reduce((formattedObj, [key, value]) => {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );
    formattedObj[snakeKey] = value;
    return formattedObj;
  }, {});
};
