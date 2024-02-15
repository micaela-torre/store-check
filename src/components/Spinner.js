import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export const Spinner = () => (
  <ActivityIndicator animating={true} color={MD2Colors.purple500} />
);

 