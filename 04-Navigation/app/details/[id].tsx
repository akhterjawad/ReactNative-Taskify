import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // If you're using Expo

const SingleUser = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <View style={styles.card}>
          {/* User Image */}
          {/* <View style={styles.imageContainer}>
            <Image
              source={{ uri: data.image || 'https://via.placeholder.com/150' }} // Placeholder image if not available
              style={styles.image}
            />
          </View> */}

          {/* User Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.username}>@{data.username}</Text>
            <Text style={styles.email}>{data.email}</Text>
            <Text style={styles.phone}>Phone: {data.phone}</Text>
            <Text style={styles.website}>Website: {data.website}</Text>

            {/* Address Details */}
            <View style={styles.addressContainer}>
              <Text style={styles.sectionTitle}>Address</Text>
              <Text>{data.address.street}, {data.address.suite}</Text>
              <Text>{data.address.city}, {data.address.zipcode}</Text>
            </View>

            {/* Company Details */}
            <View style={styles.companyContainer}>
              <Text style={styles.sectionTitle}>Company</Text>
              <Text>{data.company.name}</Text>
              <Text>{data.company.catchPhrase}</Text>
              <Text>{data.company.bs}</Text>
            </View>

            {/* Add to Cart or Action Button */}
            <View style={styles.actionContainer}>
              <Button title="View More" color="#4F46E5" onPress={() => alert('More details!')} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
           <ActivityIndicator size="large" color="#4F46E5" />{/* spinner */}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 5,
  },
  website: {
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 15,
  },
  addressContainer: {
    marginBottom: 15,
  },
  companyContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionContainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SingleUser;
