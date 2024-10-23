import { View, Text, SafeAreaView, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';

interface Item {
    name: string;
    id: number;
}

const index = () => {
    const [users, setUsers] = useState<null | []>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                setUsers(json);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {loading && (
                    <ActivityIndicator size="large" color="#007bff" />
                )}

                {error && (
                    <Text style={styles.errorText}>Error occurred while fetching data</Text>
                )}

                {users && users.map((item: Item) => {
                    return (
                        <View style={styles.item} key={item.id}>
                            <Link href={`details/${item.id}`} style={styles.link}>
                                <Text style={styles.nameText}>{item.name}</Text>
                            </Link>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    scrollView: {
        padding: 16,
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 2,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    link: {
        textDecorationLine: 'none',
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default index;
