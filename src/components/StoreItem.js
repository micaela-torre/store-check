import * as React from 'react';
import { TouchableRipple, Text } from 'react-native-paper';
import { CardItem } from './CardItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const StoreItem = ({ name, address: { direction }, open, schedule: { from, end }, goToStore }) => {
  return (
    <TouchableRipple onPress={goToStore} rippleColor="rgba(0, 0, 0, .32)">
      <CardItem title={name} description={`${direction} ● ${from} - ${end}`}>
        <Icon name={open ? 'meeting-room' : 'door-front'} size={25} color={open ? 'green' : 'red'} />
        <Text>The store is {open ? 'open' : 'closed'}</Text>
      </CardItem>
    </TouchableRipple>
  );
};
