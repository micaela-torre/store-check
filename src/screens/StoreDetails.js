import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TaskItem } from '../components/TaskItem';
import { StoresServices } from '../services/stores.services';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusSnackbar } from '../components/StatusSnackbar';
import { StoreDetailsText } from '../constants/generalText';
import styles from '../styles/globalStyle';
import { ContainerHeader } from '../components/ContainerHeader';

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
    let messageError = StoreDetailsText.messageErrorGeneral;
    try {
      if (!openStore) {
        messageError = StoreDetailsText.messageErrorStoreClosed;
        throw new Error(messageError);
      }
      if (dataTasks?.find(task => task.id === taskId)?.assigned) {
        messageError = StoreDetailsText.messageErrorStoreAssigend;
        throw new Error(messageError);
      }

      await StoresServices.checkInStore({ data });
      await saveTaskDescription(taskDescription, taskId);
      updateDataTask(taskId, e);
      setSnackbarData({ message: StoreDetailsText.messageSuccesGeneral, type: 'success' });
    } catch (e) {
      setSnackbarData({ message: messageError, type: 'error' });
    }
  };

  const saveTaskDescription = async (description, id) => {
    try {
      const newTask = { description, id };
      const currentTasks = await AsyncStorage.getItem('tasks');
      let parsedTasks = currentTasks ? JSON.parse(currentTasks) : [];

      if (parsedTasks.some(task => task.id === id)) {
        parsedTasks = parsedTasks?.filter(task => task.id !== id);
      } else {
        parsedTasks.push(newTask);
      }
      await AsyncStorage.setItem('tasks', JSON.stringify(parsedTasks));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlerGoBack = () => navigation.goBack();

  return (
    <ContainerHeader title={name} goBack={handlerGoBack}>
      <Text style={styles.text}>{StoreDetailsText.title}</Text>
      {dataTasks?.map(task => (
        <TaskItem key={`task:${task.id}`} {...task} checkInTask={handlerCheckInTask} disabled={!openStore} storeId={id} {...task} />
      ))}
      <StatusSnackbar message={snackbarData?.message} type={snackbarData?.type} setMessage={setSnackbarData} />
    </ContainerHeader>
  );
};

export default StoreDetails;
