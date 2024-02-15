import * as React from 'react';
import { Card, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TaskItem = ({ description, assigned, checkInTask, storeId, disabled, id }) => {
  return (
    <Card.Title
      title={description}
      left={props => <Icon size={40} name="task" color="#b0c2f2" {...props} />}
      right={props => <Switch value={assigned} onValueChange={e => checkInTask(storeId, id, description, e)} disabled={disabled} {...props} />}
    />
  );
};
