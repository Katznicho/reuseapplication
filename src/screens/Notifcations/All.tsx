import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReviewTypes from '../../components/ReviewTypes';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import NotificationCard from '../../components/NotificationCard';
import { useFirebase } from '../../hooks/useFirebase';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from '../../components/ActivityIndicator';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const All = (): JSX.Element => {

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
                <ReviewTypes name="All" data={details} />
                {/* notification type */}
                {/* notification details */}
                {notifications.map((item, index) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            type={item.title}
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

export default All
