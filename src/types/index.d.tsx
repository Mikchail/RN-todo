interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
  description: string;
  photo?: undefined | string;
  ts: Date;
}

interface ItemProps {
  item: ITodoItem;
}
export {
  ITodoItem, ItemProps
}