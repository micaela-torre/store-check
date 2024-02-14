import React, {useEffect, useState} from 'react';
import {List, FAB, Text} from 'react-native-paper';
import Header from '../components/Header';
import {Container} from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CardItem} from '../components/CardItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await getSavedTasks();
      setTasks(savedTasks);
    };

    fetchTasks();
    // return () => setTasks([])
  }, []);

  const getSavedTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
console.log('parsedTasks', parsedTasks)
      return parsedTasks;
    } catch (error) {
      return [];
    }
  };

  return (
    <Container>
      <Header title="My Tasks" />

      {!tasks.length ? (
        <Text>You do not have assigned tasks yet.</Text>
      ) : (
        <List.Section>
          {tasks.map((task, index) => (
            <CardItem
              key={`task_assigned_${index}`}
              title={task}
              description={task}
            />
          ))}
        </List.Section>
      )}
    </Container>
  );
};

export default TaskScreen;
