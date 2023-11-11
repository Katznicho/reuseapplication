import { SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReviewTypes from '../../components/ReviewTypes';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import NotificationCard from '../../components/NotificationCard';
import { useFirebase } from '../../hooks/useFirebase';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import NotAvailable from '../../components/NotAvailable';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const Recent = () => {

    const { user } = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any[]>([])

    const { getAllNotifications } = useFirebase();

    const { reuseTheme } = useUserPreferredTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [details] = useState([
        {
            name: 'Recent',
            screen: 'Recent',
        },
        {
            name: 'Events',
            screen: 'Events',
        },
        {
            name: 'All',
            screen: 'All',
        },
    ]);


    useEffect(() => {
        setLoading(true);
        getAllNotifications(user?.UID).then((res) => {
            setNotifications(res);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }, [])

    if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
        <ActivityIndicator />
    </SafeAreaView>


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* notification type */}
                <ReviewTypes name="Recent" data={details} />

                {!loading && notifications.length > 0 ? notifications.map((item, index) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            type={item.title}
                            description={item.description}
                            time={item.time}
                            id={item.id}
                        />
                    );
                }) :
                    <View >
                        <NotAvailable
                            text={"You dont have any notifications"}
                        />
                        <View>
                            {/* <Button
                                mode="contained"
                                buttonColor={reuseTheme.colors.preference.primaryForeground}
                                textColor={reuseTheme.colors.preference.primaryText}
                                onPress={() => navigation.navigate('CreateProducts')}
                            >
                                Create Products
                            </Button> */}
                        </View>

                    </View>
                }
                {/* notification details */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Recent
