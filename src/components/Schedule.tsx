import moment from 'moment';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ITodoItem } from '../types/index.d';
import Card from './ui/Card';

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

const timeToString = (time: any) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const Schedule: React.FC = () => {
  const [items, setItems] = useState<any>({});
  const todos = useTypedSelector((state) => state.todo.todos);

  const loadItems = () => {
    setTimeout(() => {
      const newItems = [...todos].reduce<Record<string, any>>((accum, todo) => {
        const key = timeToString(todo.ts);
        
        if (!accum[key]) {
          accum[key] = [];
        }
        accum[key].push(todo)
        return accum
      }, {})
      console.log(newItems);
      
      setItems(newItems);
    }, 1000);
  };
  // const loadItems = (day: any) => {
  //   console.log(day);
    
  //   const items: any = {};
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       console.log(strTime);
        
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems: any= {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };
  const renderItem = (item: ITodoItem) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>
            {item.title}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };
  
  return (
      <Agenda
        items={items}
        rowHasChanged={(r1, r2) => {return r1.title !== r2.title}}
        renderEmptyDate={() => null}
        loadItemsForMonth={loadItems}
        selected={timeToString(Date.now())}
        renderItem={renderItem}
      />
  );
};

export default Schedule;