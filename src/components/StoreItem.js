import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardItem } from './CardItem';
import { TouchableRipple, Text } from 'react-native-paper';
import { StoreItemText } from '../constants/generalText';
import styles from '../styles/globalStyle';

export const StoreItem = ({ name, address: { direction }, open, schedule: { from, end }, goToStore }) => {
  return (
    <TouchableRipple onPress={goToStore} rippleColor="rgba(0, 0, 0, .32)">
      <CardItem title={name} description={`${direction} ● ${from} - ${end}`}>
        <Icon name={open ? 'meeting-room' : 'door-front'} size={25} color={open ? 'green' : 'red'} />
        <Text style={styles.text}>{StoreItemText.getTitle(open)}</Text>
      </CardItem>
    </TouchableRipple>
  );
};
