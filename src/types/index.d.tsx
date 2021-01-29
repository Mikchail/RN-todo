interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
  description: string;
  photo?: boolean | null;
}

interface ItemProps {
  item: ITodoItem;
}
export {
  ITodoItem, ItemProps
}