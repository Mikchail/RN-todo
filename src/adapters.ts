import {ITodoItem} from './types/index.d';

interface Response {
  [index: string]: string;
}

export const adapter = (item: any, id: string): ITodoItem => {
  item['id'] = id;
  return item;
};

export const adapterOfAllData = (data: Response): Array<ITodoItem> => {
  const keys = Object.keys(data);
  const adaptedData = keys.map((key) => {
    return adapter(data[key], key);
  });
  return adaptedData;
};
