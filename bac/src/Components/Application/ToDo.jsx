

import { useState, useEffect } from "react";
import axios from "axios";
import Title from "../Application/title";
import ListItem from "../Application/listitems";
import Form from "../Application/form";
import { toast } from "react-hot-toast"; // Import react-hot-toast

function TodoApp() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");

  // Fetch todos from the backend on initial load
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        setItems(response.data);
        toast.success("Todos fetched successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error fetching todos:", error.message);
        toast.error("Error fetching todos"); // Show error toast
      });
  }, []);

  // Add a new task
  function handleAddItem(description) {
    if (!description.trim()) {
      toast.error("Task description cannot be empty.");  // Show error toast if description is empty
      return;
    }

    const newItem = { taskname: description };

    axios
      .post("http://localhost:5000/todos", newItem)
      .then((response) => {
        setItems((prevItems) => [...prevItems, response.data]);
        setDescription(""); // Clear the input field after adding
        toast.success("Task added successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error adding todo:", error.message);
        toast.error("Error adding task"); // Show error toast
      });
  }

  // Modify an existing task
  function handleModifyTask(taskId, newDescription) {
    axios
      .put(`http://localhost:5000/todos/${taskId}`, { taskname: newDescription })
      .then((response) => {
        // Update the items array with the modified task
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === taskId ? { ...item, taskname: newDescription } : item
          )
        );
        toast.success("Task updated successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error updating todo:", error.message);
        toast.error("Error updating task"); // Show error toast
      });
  }

  // Delete a task
  function handleDeleteTask(taskId) {
    axios
      .delete(`http://localhost:5000/todos/${taskId}`)
      .then(() => {
        // Remove the deleted item from the state
        setItems((prevItems) => prevItems.filter((item) => item.id !== taskId));
        toast.success("Task deleted successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error deleting todo:", error.message);
        toast.error("Error deleting task"); // Show error toast
      });
  }

  return (
    <main id="main">
      <div className="container">
        <div className="todo-list">
          <Title />
          <Form
            description={description}
            setDescription={setDescription}
            onAddItem={() => handleAddItem(description)}
          />
          <ListItem
            items={items}
            onModifyTask={handleModifyTask} // Pass the modify function
            onDeleteTask={handleDeleteTask} // Pass the delete function
          />
        </div>
      </div>
    </main>
  );
}

export default TodoApp;
