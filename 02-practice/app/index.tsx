import { useState } from "react";
import { Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";

const index = () => {
  const [input, setInput] = useState<string>('');
  const [array, setarray] = useState<string[]>([])
  function addtodo() {
    array.push(input)
    setarray([...array])
    console.log(array);
  }
  function deletetodo(i: number) {
    array.splice(i, 1)
    setarray([...array])
    console.log('delete', i);

  }


  return (
    <SafeAreaView className="flex-1 border-2 border-gray-400 items-center justify-center">
      <Text className="text-2xl">todo app</Text>
      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 1,
          width: 200,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
        onChangeText={setInput}
        value={input}
        placeholder='enter todo ' />


      <TouchableOpacity className="border mb-5"><Text onPress={addtodo} style={{ fontSize: 20, marginTop: 10, }}>add button</Text>
      </TouchableOpacity>

      <FlatList
        data={array}
        renderItem={({ item, index }) => (<Text style={{ fontSize: 20, marginTop: 10, }}>{item} <TouchableOpacity className="border mb-5"><Text onPress={() => deletetodo(index)} style={{ fontSize: 20, marginTop: 10, }}>delete button</Text>
        </TouchableOpacity></Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </SafeAreaView>
  )
}

export default index