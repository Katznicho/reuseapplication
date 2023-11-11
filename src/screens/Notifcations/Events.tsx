import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReviewTypes from '../../components/ReviewTypes';
import { NotificationInterface } from '../../types/types';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import NotificationCard from '../../components/NotificationCard';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { useFirebase } from '../../hooks/useFirebase';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const Events = (): JSX.Element => {

    const { user } = useSelector((state: RootState) => state.user);

    const { reuseTheme } = useUserPreferredTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any[]>([])

    const { getAllNotifications } = useFirebase();
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
                <ReviewTypes name="Events" data={details} />
                {/* notification type */}
                {/* notification details */}
                {notifications.map((item, index) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            type={item.type}
                            description={item.description}
                            time={item.time}
                            id={item.id}
                        />
                    );
                })}
                {/* notification details */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Events
