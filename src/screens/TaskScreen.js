import React, { useCallback, useState } from 'react';
import { List, Text } from 'react-native-paper';
import { CardItem } from '../components/CardItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ContainerHeader } from '../components/ContainerHeader';
import { Spinner } from '../components/Spinner';
import styles from '../styles/globalStyle';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [inPromise, setInPromise] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const savedTasks = await getSavedTasks();
          if (isActive) {
            setTasks(savedTasks);
          }
        } catch (e) {
          //
        } finally {
          setInPromise(false);
        }
      };

      fetchData();

      return () => {
        isActive = false;
        setTasks([]);
        setInPromise(false);
      };
    }, [])
  );
  const getSavedTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      return parsedTasks;
    } catch (error) {
      return [];
    }
  };

  return (
    <ContainerHeader title="My Tasks">
      {inPromise && <Spinner />}
      {!tasks.length ? (
        <Text style={styles.text}>You do not have assigned tasks yet!</Text>
      ) : (
        <List.Section>
          {tasks?.map(task => (
            <CardItem key={`task_assigned_${task.id}`} title={task.description} description={task.description} />
          ))}
        </List.Section>
      )}
    </ContainerHeader>
  );
};

export default TaskScreen;
