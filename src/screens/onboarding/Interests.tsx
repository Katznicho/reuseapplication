import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme'
import SwiperText from '../../components/SwiperText/SwiperText';
import { ScrollView } from 'react-native-gesture-handler';
import { ReuseTheme } from '../../types/types';
import { SwiperScreenProps } from './SwiperScreen';

const interests = [
    {
        id: 1,
        name: 'Art',


    }, {
        id: 2,
        name: 'Books',

    },
    {
        id: 3,
        name: 'Environment',

    },
    {
        id: 4,
        name: 'Food',

    }, {
        id: 5,
        name: 'Health',
    },
    {
        id: 6,
        name: 'Disaster Relief',
    }, {
        id: 7,
        name: 'Education',
    },
    {
        id: 8,
        name: "Campaigns"
    }, {
        id: 9,
        name: "Animals"
    },
    {
        id: 10,
        name: "Community"
    }, {
        id: 11,
        name: "Children"
    }, {
        id: 12,
        name: "Orphans"
    }, {
        id: 13,
        name: "Social"
    }, {
        id: 14,
        name: "Sports"
    }, {
        id: 15,
        name: "Technology"
    }, {
        id: 16,
        name: "Others"
    }
]

const Interests = ({setUserProfile}:SwiperScreenProps) => {
    const { reuseTheme } = useUserPreferredTheme();
    const styles = interestStyles(reuseTheme);
    const [selectedInterests, setSelectedInterests] = React.useState<any[]>([])

    const renderItem = ({ item }:any) => {
        //check if the item is selected to change the background color
         let backgroundColor = reuseTheme.colors.preference.transparent;
         //let color = reuseTheme.colors.preference.primaryForeground;
        if (selectedInterests.includes(item.name)) {
            backgroundColor = reuseTheme.colors.preference.primaryForeground;
            //color = reuseTheme.colors.preference.primaryBackground;
        }

        return (
          <TouchableOpacity style={[styles.itemContainer]}
            onPress={() => {
                if (selectedInterests.includes(item.name)) {
                    setSelectedInterests((prev) => {
                        return prev.filter((interest) => interest !== item.name)
                    })
                } else {
                    setSelectedInterests((prev) => {
                        return [...prev, item.name]
                    })
                }
                setUserProfile((prev:any) => {
                    return {...prev, interests:selectedInterests}
                    }
                    )
            }}

          >
            <View style={[styles.item ,{backgroundColor:backgroundColor}]}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>

                <SwiperText
                    headerText={`Select your interests`}
                    smallText={` Dont worry you can change this later`}
                    smallerText={`in the settings`}
                />
                {/* 3 items per row */}
            
                <FlatList
                    data={interests}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={4}
                    contentContainerStyle={{ paddingHorizontal: 5, marginHorizontal: 20 }}
                />
                {/* 3 items per row */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Interests

const  interestStyles  =  (theme:ReuseTheme) => StyleSheet.create({
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   padding: 10,
    margin:3
    },
    item: {
      borderRadius: 8,
      paddingVertical: 16,
      elevation: 4, // This adds the raised effect for Android
      
      height:70,
      width:70,
      marginHorizontal:10,
    },
    itemText: {
      textAlign: 'center',
      fontSize: 12,
      color:theme.colors.preference.primaryText
    },
  });