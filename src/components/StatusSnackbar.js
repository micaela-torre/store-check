import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

export const StatusSnackbar = ({ message, type = 'success', setMessage }) => {
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  useEffect(() => {
    if (message) setVisible(true);
    return () => {
      setVisible(false);
    };
  }, [message]);

  if (!message) return null;
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={type === 'success' ? 2000 : 4000}
        action={{
          label: 'OK',
          onPress: onDismissSnackBar,
        }}
        style={type === 'success' ? styles.successSnackbar : styles.errorSnackbar}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  successSnackbar: {
    backgroundColor: 'green',
  },
  errorSnackbar: {
    backgroundColor: 'red',
  },
});
