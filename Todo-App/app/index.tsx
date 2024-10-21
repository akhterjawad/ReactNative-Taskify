import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, Alert, Pressable } from "react-native";

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('')
  const [index, setIndex] = useState(0)

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
  function editTodo(i: number) {

    console.log('todo edit', i)
    todo.splice(i, 1, updateInput);
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

      <TouchableOpacity style={styles.button} activeOpacity={0.3} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => {
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

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Todo!</Text>
              <TextInput
                style={styles.updateInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <Pressable
                style={[styles.modalBtn, styles.buttonClose]}
                onPress={() => {
                  setIndex(index)
                  setModalVisible(true)
                }
                }>
                <Text style={styles.textStyle}>Update Todo</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5ff',  // Soft blue background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 32, 
    fontWeight: '700', // Heavier font-weight for impact
    color: '#007ACC',  // Matching accent color
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#007ACC', 
    borderWidth: 1,
    borderRadius: 12, 
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007ACC', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5, // Elevation for depth
    marginBottom: 10,
    flexDirection: 'row', // To handle button text/icon
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, 
  },
  editButton: {
    backgroundColor: '#FFD700', 
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20, 
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    color: '#34495e', 
    fontWeight: '500',
  },
  noTodoText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
  updateInput: {
    margin: 20,
    width: 250,
    borderWidth: 1,
    borderColor: '#007ACC',
    borderRadius: 8,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background for the modal
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#007ACC',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Home;

