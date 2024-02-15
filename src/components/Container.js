import React from 'react';
import { View } from 'react-native';
import styles from '../styles/globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children, style }) => {
  return <SafeAreaView  style={[styles.container, style]}>{children}</SafeAreaView >;
};