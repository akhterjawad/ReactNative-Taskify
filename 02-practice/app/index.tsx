import { useState } from "react";
import { Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";

function Home() {
  let [input, setInput] = useState('')
  const [todo, setTodo] = useState<string[]>([])
  function addtodo() {
    todo.push(input)
    setTodo([...todo])
  }
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
          marginTop: 10,
          borderWidth: 1,
          width: 200,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
        onChangeText={setInput}
        value={input}
        placeholder='enter todo ' />
      <TouchableOpacity><Text onPress={addtodo} style={{ fontSize: 20, marginTop: 10, }}>add button</Text>
      </TouchableOpacity>
      <FlatList data={todo}
        renderItem={({ item, index }) => (
          <Text style={{ fontSize: 20, marginTop: 10, }}>{item}</Text>
        )

        } keyExtractor={(item, index) => item.toString()} />

    </SafeAreaView>
  );
}
export default Home;