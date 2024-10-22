import { useState } from "react";
import { Text, SafeAreaView, TextInput } from "react-native";

function Index() {
  let [input, setInput] = useState('')
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 30 }}>todo app</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: 200,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
        onChangeText={setInput}
        value={input}
        placeholder='enter todo '></TextInput>
    </SafeAreaView>
  );
}
export default Index;