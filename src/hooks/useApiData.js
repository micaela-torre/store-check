import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export const useApiData = ({ service }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const handleDataStorage = async data => {
    const listTask = await AsyncStorage.getItem('tasks');
    const parsedTasks = listTask ? JSON.parse(listTask) : [];

    if (parsedTasks.length > 0) {
      const listTaskResults = [];
      data?.forEach(store => listTaskResults.push(...store.tasks));
      const idTasks = parsedTasks.map(task => task.id);

      const existTaskAssigned = listTaskResults.some(task => idTasks.includes(task.id) && !task.assigned);
      if (existTaskAssigned) {
        await AsyncStorage.removeItem('tasks');
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const callService = async () => {
        try {
          setIsLoading(true);
          const results = await fetchData();
          if (isActive) {
            const items = results.data || [];
            handleDataStorage(items);
            setData(items);
          }
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
        }
      };

      callService();

      return () => {
        isActive = false;
        setData([]);
      };
    }, [])
  );
  const fetchData = async params => {
    try {
      const results = await service({ data: params, signal });
      return results;
    } catch (e) {
      throw new Error(e);
    }
  };

  return { isLoading, data, error, refetchData: fetchData };
};
