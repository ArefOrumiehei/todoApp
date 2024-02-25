import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

//Components
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
    Keyboard.dismiss();
  };

  const removeTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => removeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        onBlur={() => Keyboard.dismiss()}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addBtn}><AntDesign name="plus" size={24} color="black" /></Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: 250,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  addBtn: {},
});
