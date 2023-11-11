import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';


const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    return (
        <View style={generalstyles.container}>
            <Text>Home</Text>
        </View>
    )
}

export function TopBars() {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    
    return (
        <Tab.Navigator

            screenOptions={{
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: {
                    backgroundColor: reuseTheme.colors.preference.primaryBackground,
                    borderBottomColor: reuseTheme.colors.preference.primaryForeground,

                },
                tabBarActiveTintColor: reuseTheme.colors.preference.primaryText,
                tabBarInactiveTintColor: reuseTheme.colors.preference.grey6,
                tabBarItemStyle: {
                    // borderBottomColor:theme.colors.buttonColor,
                    // borderWidth:1
                }

            }}


        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}

                options={{
                    tabBarLabel: "Draft(24)",


                }}

            />
            <Tab.Screen name="Settings"
                options={{
                    tabBarLabel: "Published(44)",


                }}
                component={HomeScreen} />

                
        </Tab.Navigator>
    );
}