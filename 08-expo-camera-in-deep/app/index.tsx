import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library'; //photo save karne ke liye.
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font'; //custom font load karne ke liye.
import { Poppins_400Regular } from '@expo-google-fonts/poppins';


SplashScreen.preventAutoHideAsync();//Yeh line app start hone par splash screen ko auto-hide hone se rokta hai.

export default function App() {

  // states
  const [facing, setFacing] = useState<CameraType>('back');//yeh decide karta hai ke camera back-facing hai ya front-facing.
  const [showCamera, setShowCamera] = useState(false);//yeh decide karta hai ke camera visible hai ya nahi.
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');

  // camera permission
  const [permission, requestPermission] = useCameraPermissions();


  // camera ref
  const cameraRef = useRef<any>();//Yeh useRef ka hook camera ko reference (yaani ek pointer) dene ke liye hai jo hum future mein image capture karne ke waqt use karenge.

  const [loaded, error] = useFonts({
    Poppins_400Regular,
  });//Yeh font load hone ka status check karta hai. Agar font successfully load ho gaya toh loaded true ho jaayega.

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);//Yeh useEffect function font load hone par ya error aane par splash screen ko hide karne ke liye hai.

  if (!loaded && !error) {
    return null;
  }
//Agar font load nahi hua aur koi error bhi nahi hai, toh screen par kuch display nahi hoga.


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // capture image 
  async function handleCapture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert('Photo Saved!', `Your photo has been saved to your library: ${asset.uri}`);
    }
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      {showCamera && <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flashMode} enableTorch={false}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text} onPress={() => setFlashMode(flashMode === 'on' ? 'off' : 'on')}>{flashMode === 'on' ? 'on' : 'off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.text}>click</Text>
          </TouchableOpacity>
        </View>
      </CameraView>}
      <Button title={showCamera ? 'close camera' : 'show camera'} onPress={() => setShowCamera(!showCamera)} />
      <Text style={{
        fontFamily: 'Poppins_400Regular',
        fontSize: 50
      }}>Hello poppins here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins_400Regular'
  },
});
