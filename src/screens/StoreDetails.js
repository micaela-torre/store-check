import React, { useState } from 'react';
import { Container } from '../components/Container';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { TaskItem } from '../components/TaskItem';
import { StoresServices } from '../services/stores.services';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusSnackbar } from '../components/StatusSnackbar';

const StoreDetails = ({ route }) => {
  const {
    chosenStore: { tasks, name, id, open: openStore },
  } = route?.params;
  const [snackbarData, setSnackbarData] = useState(null);
  const [dataTasks, setDataTasks] = useState(tasks);
  const navigation = useNavigation();

  const updateDataTask = (taskId, e) => {
    const cloneDataTasks = [...dataTasks];
    const indexTask = cloneDataTasks.findIndex(task => task.id === taskId);
    if (indexTask !== -1) {
      cloneDataTasks[indexTask].assigned = e;
    }
    setDataTasks(cloneDataTasks);
  };

  const handlerCheckInTask = async (storeId, taskId, taskDescription, e) => {
    const data = { storeId, taskId };
    let messageError = 'An error occurred while assigning the task.';
    try {
      if (!openStore) {
        messageError = "You can't assign yourself because the store is closed";
        throw new Error(messageError);
      }
      if (dataTasks?.find(task => task.id === taskId)?.assigned) {
        messageError = 'This task has already been assigned';
        throw new Error(messageError);
      }

      await StoresServices.checkInStore({ data });
      await saveTaskDescription(taskDescription);
      updateDataTask(taskId, e);
      setSnackbarData({ message: 'The task was assigned successfully :)', type: 'success' });
    } catch (e) {
      setSnackbarData({ message: messageError, type: 'error' });
    }
  };

  const saveTaskDescription = async taskDescription => {
    try {
      const currentTasks = await AsyncStorage.getItem('tasks');
      let parsedTasks = currentTasks ? JSON.parse(currentTasks) : [];
      const existTaskInStorage = parsedTasks?.includes(taskDescription);
      if (existTaskInStorage) {
        parsedTasks = parsedTasks?.filter(task => task !== taskDescription);
      } else {
        parsedTasks.push(taskDescription);
      }
      await AsyncStorage.setItem('tasks', JSON.stringify(parsedTasks));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlerGoBack = () => navigation.goBack();

  return (
    <Container>
      <Header title={name} goBack={handlerGoBack} />
      <Text m={2}>Let's get started! Choose a task for today</Text>
      {dataTasks?.map(task => (
        <TaskItem
          key={`task:${task.id}`}
          {...task}
          checkInTask={e => handlerCheckInTask(id, task.id, task.description, e)}
          disabled={!openStore}
        />
      ))}
      <StatusSnackbar message={snackbarData?.message} type={snackbarData?.type} setMessage={setSnackbarData} />
    </Container>
  );
};

export default StoreDetails;
