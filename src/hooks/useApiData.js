import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useApiData = ({ service }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const fetchData = async params => {
    try {
      setIsLoading(true);
      const results = await service({ data: params, signal });
      await AsyncStorage.removeItem('tasks');
      const items = results.data || [];
      setData(items);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortController.abort();
      setData([]);
    };
    //eslint-disable-next-line
  }, []);

  return { isLoading, data, error, refetchData: fetchData };
};
