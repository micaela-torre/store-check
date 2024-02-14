import * as React from 'react';
import {Card, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TaskItem = ({description, assigned, checkInTask, disabled}) => {
  return (
    <Card.Title
      title={description}
      left={props => (
        <Icon
          {...props}
          size={40}
          name="task"
          color="#b0c2f2"
        />
      )}
      right={props => (
        <Switch {...props} value={assigned} onValueChange={checkInTask} disabled={disabled}/>
      )}
    />
  );
};
