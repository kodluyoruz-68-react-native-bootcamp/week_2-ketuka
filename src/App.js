import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Input } from "./components"

function App() {
  const [todos, setTodos] = useState([]);
  const [isChange, setIsChange] = useState(0);
  const [searchText, setSearchText] = useState('');

  const submitHandler = (text) => {
    if (text.length > 0) {
      setTodos([...todos, { title: text, id: Math.random().toString(36).substr(1, 9), isDone: false }]);
    }
  }


  const itemOnPress = (id) => {

    const index = todos.findIndex((item) => item.id === id);
    const selected = todos.find((item) => item.id === id);
    selected.isDone = !selected.isDone;
    const newTodos = [...todos];
    newTodos[index] = selected;
    setTodos(newTodos);
  }
  const pressHandler = (id) => {
    setTodos(todos.filter(item => item.id != id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.text}>TODO</Text>
          <Text style={styles.counter}>{todos.filter(item => item.isDone == false).length}</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            testID="list"
            data={todos}

            keyExtractor={(item, index) => 'key' + item.id}
            renderItem={({ item, index }) => (
              <View>
                <TouchableHighlight style={[styles.item, item.isDone ? { opacity: 0.5} : { opacity: 1 }]} onPress={() => itemOnPress(item.id)} onLongPress={() => pressHandler(item.id)}>
                  <Text style={[{ color: "white" }, item.isDone ? {textDecorationLine:'line-through'}:null]}>{item.title}</Text>
                </TouchableHighlight>
              </View>
            )
            }
          />
        </View>
        <View style={styles.footer}>
          <Input
            inputId="input"
            buttonId="button"
            placeholder="Type something todo.."
            title="ADD TODO"
            press={submitHandler}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEFF2"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  text: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10
  },
  counter: {
    fontWeight: "bold",
    fontSize: 20,
    paddingRight: 10
  },
  content: {
    flex: 5,
  },
  item: {
    backgroundColor: "#B61C1C",
    borderRadius: 5,
    margin: 5,
    padding: 10,
    opacity: 0
  },

  isDone: {
    opacity: 0.5
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#BDBDBD"
  },
})