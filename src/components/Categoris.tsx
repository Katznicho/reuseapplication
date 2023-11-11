import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ReuseTheme } from '../types/types'
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { ActivityIndicator } from './ActivityIndicator';
import { useFirebase } from '../hooks/useFirebase';
import NotAvailable from './NotAvailable';


const Categories = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const { getAllCategories } = useFirebase();
    const [categories, setCategories] = useState<any[]>([]);

    const styles = categoryStyles(reuseTheme);

    useEffect(() => {
         setLoading(true);
        getAllCategories().then((data) => {
            setCategories(data)
        })
        setLoading(false)

    }, [])


    if (loading) return <ActivityIndicator />



    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                categories.length > 0 ? categories?.map((item, index) => (
                    <View
                        key={item?.imageURL}
                    >
                        <TouchableOpacity style={styles.categoryContainer}>
                            <Image style={styles.categoryImage} source={{ uri: item?.imageURL }} />
                            <Text style={styles.categoryName}>{item?.name}</Text>
                        </TouchableOpacity>
                    </View>
                )) :
                    <View>
                        <NotAvailable text={"No Categories available"} />
                    </View>
            }
        </ScrollView>
    )
}

export default Categories

const categoryStyles = (theme: ReuseTheme) => StyleSheet.create({
    flatlistContainer: {
        marginHorizontal: 10
    },
    categoryContainer: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    categoryImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius: 20
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.colors.preference.primaryText
    },
});