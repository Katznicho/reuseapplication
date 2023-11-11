import { View } from 'react-native';
import React  ,{useState}from 'react';
import { Calendar } from 'react-native-calendars';
import { IconButton } from 'react-native-paper';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';






const CalendarComponent = ({ 
  containerStyles, 
   markedDates, 
   handleDayPress,
    disableAllTouchEventsForDays,
    minDate

 }: any) => {

    const {reuseTheme} =  useUserPreferredTheme();


    const  [theme, setTheme] = React.useState({
            backgroundColor:reuseTheme.colors.preference.primaryBackground,
            calendarBackground: reuseTheme.colors.preference.primaryBackground,
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: reuseTheme.colors.preference.primaryForeground,
            selectedDayTextColor: reuseTheme.colors.preference.primaryText,
            todayTextColor: reuseTheme.colors.preference.primaryText,
            dayTextColor: reuseTheme.colors.preference.primaryText,
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: reuseTheme.colors.preference.primaryText,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: reuseTheme.colors.preference.primaryText,
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 15,
            textDayFontWeight: '900',
          

    })

  return (
    <View>
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markingType="custom"
        markedDates={markedDates}
        style={containerStyles}
        // min data is today
        // minDate={new Date().toISOString().split('T')[0]}
        minDate={minDate}
        theme={theme}
        enableSwipeMonths={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={disableAllTouchEventsForDays}
        // disableAllTouchEventsForDays={disableTouchEventsForDays}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => (
          <IconButton
            icon={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            iconColor={reuseTheme.colors.preference.primaryText}
            size={25}
            containerColor={reuseTheme.colors.preference.primaryForeground}
            style={{
              marginLeft: direction === 'left' ? -10 : 0,
              marginRight: direction === 'right' ? -10 : 0,
            }}
          />
        )}
        onDayPress={handleDayPress}
      />

    </View>
  );
};

export default CalendarComponent;


