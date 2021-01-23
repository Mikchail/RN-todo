interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
}

interface ItemProps {
  item: ITodoItem;
}
export {
  ITodoItem, ItemProps
}