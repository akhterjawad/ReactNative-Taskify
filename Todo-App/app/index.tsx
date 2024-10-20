import { useState } from "react";
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);

  function addTodo() {
    if (input.trim() !== '') {
      todo.push(input.trim());
      setTodo([...todo]);
      setInput('');  // Clear input after adding
    } else {
      alert('enter something')
    }
  }
  function deleteTodo(i: number) {
    console.log('todo deleted', i)
    todo.splice(i, 1);
    setTodo([...todo])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>

      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder='Enter todo...'
        placeholderTextColor='#666'
      />

      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item,index }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(index)}>

                  <Text style={styles.buttonText}>delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.buttonText}>edit</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodoText}>No Todo Found...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    marginHorizontal: 90,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  noTodoText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
});

export default Home;