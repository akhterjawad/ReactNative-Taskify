import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Modal, Alert, Pressable, Animated } from "react-native";

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('')
  const [index, setIndex] = useState(0)

  const fadeAnim = useState(new Animated.Value(0))[0]; // Added fade animation for items

  function addTodo() {
    if (input.trim() !== '') {
      todo.push(input.trim());
      setTodo([...todo]);
      setInput('');  // Clear input after adding
      animateFadeIn(); // Trigger animation on add
    } else {
      alert('Please enter a valid todo item')
    }
  }

  function animateFadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  function deleteTodo(i: number) {
    todo.splice(i, 1);
    setTodo([...todo]);
  }

  function editTodo(i: number) {
    todo.splice(i, 1, updateInput);
    setTodo([...todo]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Todo List</Text>

      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder='Enter a new task...'
        placeholderTextColor='#aaa'
        onFocus={() => setInput(input)}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => (
            <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
              <Text style={styles.title}>{item}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(index)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodoText}>No tasks added yet...</Text>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Task</Text>
              <TextInput
                style={styles.updateInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <Pressable
                style={styles.modalBtn}
                onPress={() => {
                  { updateInput.trim() === '' ? alert('Please enter a valid todo item') : editTodo(index); }
                  // editTodo(index);
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Softer background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Added shadow for depth
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
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
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 4,
  },
  editButton: {
    backgroundColor: '#ffa502',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 4,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    color: '#2f3542',
    fontWeight: '700',
    textAlign: "center",
    marginBottom: 10
  },
  noTodoText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f8f8ff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  updateInput: {
    margin: 20,
    width: 250,
    borderWidth: 1,
    borderColor: '#007ACC',
    borderRadius: 8,
    padding: 10,
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
});

export default Home;
