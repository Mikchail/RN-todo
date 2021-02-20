import React, { useState } from 'react';
import { View, Text, Platform, Pressable, StyleSheet } from 'react-native';
import Button from './ui/Button';
import DateTimePicker, { Event, RCTDateTimePickerNative } from '@react-native-community/datetimepicker';
import moment from 'moment';
type TPickerMode = "date" | "time" | undefined
export enum DateTimeTypeEnum {
    Date = "date",
    Time = "time",
}
const DataPicker = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [mode, setMode] = useState<TPickerMode>('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event: Event, selectedDate?: Date) => {
        if (!!selectedDate && mode === "time") {
            setTime(selectedDate);
            const dateCorrect = new Date(date!);
            // const newDate = 
            const hours = new Date(selectedDate).getHours();
            const minutes = new Date(selectedDate).getMinutes();
            console.log(dateCorrect);
            
        }
        if (!!selectedDate && mode === "date") {
            setMode("time");
            setShow(false);
            setDate(selectedDate);
        }

    };

    const handlePress = () => {
        console.log(213);
        setMode("date");
        setShow(true);
    }
    const renderTextValueAndroid = (): JSX.Element => {
        return (
            <Pressable onPress={handlePress} style={styles.value}>
                <Text selectable={true}>
                    {date ? `${moment(date).format('LL')} ${time && moment(time).format('LTS')}` : "Set alarm"}
                </Text>
            </Pressable>

        );
    }
    return (
        <View>
            {renderTextValueAndroid()}

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    value: {
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 10,
        width: "100%",
        minWidth: 300,
        height: 30,
    }
})


export default DataPicker;