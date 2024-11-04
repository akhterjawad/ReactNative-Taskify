// // nicha wala code sirf mape lagana ka lia ha or user permission la ka live location dakhna ka lia ha
// import { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';//Is line mein hum expo-location se location-related functions ko import kar rahe hain, jo location permissions aur current location lene mein madad karte hain.

// export default function App() {
//   const [location, setLocation] = useState<null | any>(null);
//   const [errorMsg, setErrorMsg] = useState<null | string>(null);

//   useEffect(() => {
//     (async () => {

//       let { status } = await Location.requestForegroundPermissionsAsync();//Yahan hum location permission ke liye request kar rahe hain aur response mein status le rahe hain.
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({}); //Yeh line current location ko retrieve kar rahi hai.
//       setLocation(location);
//       console.log(location);

//     })();
//   }, []);

//   // function hello(){
//   //   console.log('hello world')
//   // }
//   // hello()

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);//Agar location mili, to text ko location data ko string mein convert karke assign kiya ja raha hai.
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//       {location && <MapView style={styles.map} initialRegion={{
//         latitude: location.coords.latitude,
//         // Yahan hum initialRegion define kar rahe hain jo map ke initial latitude aur longitude set karta hai.
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0001,
//         // Yeh map zoom level ko set kar raha hai.
//         longitudeDelta: 0.0001,
//       }}>
//         <Marker coordinate={{
//           latitude: location.coords.latitude,
//           // Yahan hum Marker component ko render kar rahe hain, jo current location par point karega.
//           longitude: location.coords.longitude,
//         }} />

//       </MapView>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'lightblue'
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   map: {
//     width: '100%',
//     height: '80%'
//   }
// });

// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       className="flex-1 justify-center items-center"
//     >
//       <Text className="text-center bg-red-400 p-[2rem]">Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }



// // ya wala code ma user input ma search karaga any location nicha locations ajayingi jispa click karaga map us location pa chala jayga then direction pa click karaga to direction
import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

interface SinglePlace {
  latitude: number;
  longitude: number
}

interface AllPlaces {
  fsq_id: string;
  name: string
}

export default function App() {
  const [location, setLocation] = useState<null | any>(null); // User ka current location.
  const [errorMsg, setErrorMsg] = useState<null | string>(null); //Agar location permission deny ho jaye toh error message store karta hai.
  const [search, setSearch] = useState('');//Places ka list rakhta hai jo search ke results mein miltay hain.
  const [places, setPlaces] = useState<null | AllPlaces[]>(null);
  const [singlesearchPlace, setsinglesearchPlace] = useState<null | SinglePlace>(null);
  const [region, setRegion] = useState<any>(null); //Map ke focus ki position aur zoom level set karta hai.
  const [direction, setDirection] = useState<boolean>(false);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();//Yahan hum location permission ke liye request kar rahe hain aur response mein status le rahe hain.
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); //getCurrentPositionAsync function user ki current location ko fetch kar raha hai aur location aur region state mein save kar raha hai. latitudeDelta aur longitudeDelta zoom level define karte hain.
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      })
      console.log(location);

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // search places

  const searchPlaces = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3qbL9ORBTq2ZaS6TUHxpAQZNDJjTlkT2lBeAynwmhZ8I='
      }
    };

    // Yeh searchPlaces function hai jo places search karta hai Foursquare API se. Headers mein authorization key set ki hai.

    fetch(`https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)


      .then(res => res.json())
      .then(res => {
        setPlaces(res.results)
        console.log(res.results);
      })
      .catch(err => console.error(err));
    console.log(search)
    
  }

  // single place

  const singlePlace = (item: any) => {
    setPlaces(null);
    setsinglesearchPlace({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude
    })
    setRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    })
    // singlePlace function ek place select karne par uska location set karta hai aur map region update karta hai taake woh us place par zoom kare.

    // "Geocodes" yeh ek object hai jo ek specific jagah (place) ka latitude aur longitude store karta hai. Yeh location coordinates hain jo kisi bhi jagah ko exact map pe locate karne ke liye istemaal hote hain. Is case mein, item.geocodes.main.latitude aur item.geocodes.main.longitude woh values hain jo map pe ek particular location ko point karti hain.

  }

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="search"
      />
      <TouchableOpacity onPress={searchPlaces} style={styles.button}>
        <Text>Search</Text>
      </TouchableOpacity>
      {places && <FlatList
        data={places}
        renderItem={({ item }: { item: { name: string } }) => {
          return <View style={styles.list}>
            <Text onPress={() => singlePlace(item)}>{item.name}</Text>
          </View>
        }}
        keyExtractor={(item: { fsq_id: string }) => item.fsq_id
        }
      />}
      {location && <MapView region={region} onRegionChangeComplete={setRegion} style={styles.map}>
        <Marker coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }} />
        {singlesearchPlace && <Marker coordinate={{
          latitude: singlesearchPlace.latitude,
          longitude: singlesearchPlace.longitude,
        }} />}
        {singlesearchPlace && direction && <Polyline coordinates={[{ latitude: location.coords.latitude, longitude: location.coords.longitude }, {
          latitude: singlesearchPlace.latitude,
          longitude: singlesearchPlace.longitude
        }]} strokeWidth={5} strokeColor='#000000' />}

      </MapView>}

      <TouchableOpacity onPress={() => setDirection(!direction)} style={styles.button}>
        <Text>Direction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  input: {
    height: 40,
    width: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  list: {
    backgroundColor: 'gray',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    width: 280
  }
});