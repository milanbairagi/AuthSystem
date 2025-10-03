import { useState, useEffect } from "react";

import api from "../api";
import { useUser } from "../contexts/userContext";


const useTasks = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`v1/tasks/`);
        setTasks(response.data.results);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addTask = async (task) => {
    try {
      const response = await api.post("v1/tasks/", task);
      setTasks((prevTasks) => [response.data, ...prevTasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await api.put(`v1/tasks/${task.id}/`, task);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (task) => {
    try {
      await api.delete(`v1/tasks/${task.id}/`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return { tasks, loading, addTask, updateTask, deleteTask };
};

export default useTasks;
