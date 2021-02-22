import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, PermissionsAndroid } from 'react-native';
import Button from './ui/Button';
import DateTimePicker, { Event, RCTDateTimePickerNative } from '@react-native-community/datetimepicker';
import moment from 'moment';
type TPickerMode = "date" | "time" | undefined
export enum DateTimeTypeEnum {
    Date = "date",
    Time = "time",
}





const getHoursMinutesSeconds = (time: Date) => {
    const date = new Date(time);
    const hours = date.getHours() * 60 * 60 * 1000;
    const minutes = date.getMinutes() * 60 * 1000;
    const seconds = date.getSeconds() * 1000;
    const milliseconds = date.getMilliseconds();
    return hours + minutes + seconds + milliseconds;
}

const DataPicker = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [temp, setTemp] = useState<Date | null>(null);
    const [show, setShow] = useState(false);

    const onChange = (event: Event, selectedDate?: Date) => {
        console.log(temp);
        if (!!temp && !!selectedDate) {
            setShow(false)
            const dateTime = getHoursMinutesSeconds(temp)
            const selectedDateTime = getHoursMinutesSeconds(selectedDate)
            const correctDateTime = new Date(new Date(temp).getTime() - dateTime + selectedDateTime);
            setDate(correctDateTime);
            setTemp(null);
        }

        if (!!selectedDate && !temp) {
            setTemp(selectedDate)
        }

    };

    const handlePress = () => {
        setShow(true);
    }

    const setEventAlarm = async (date: Date) => {
        console.log('*** _requestPermission');
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR);
        if (!hasPermission) {
            const getPermition = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR);
            return;
        }
    }

    const renderTextValueAndroid = (): JSX.Element => {
        return (
            <Pressable onPress={handlePress} style={styles.value}>
                <Text selectable={true}>
                    {date ? `${moment(date).format('LLL')}` : "Set alarm     +"}
                </Text>
            </Pressable>
        );
    }

    return (
        <View>
            {renderTextValueAndroid()}
            {show && !temp && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {show && temp && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"time"}
                    is24Hour={true}
                    display="spinner"
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