export interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
}

export interface ItemProps {
  item: ITodoItem;
}