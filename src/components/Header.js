import * as React from 'react';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({title = '', goBack}) => {
  return (
    <Appbar.Header style={{backgroundColor: '#8C52FF'}}>
      {goBack && (
        <Appbar.Action
          icon={() => <Icon name="arrow-back-ios" size={25} color="#fff" />}
          onPress={goBack}
        />
      )}
      <Appbar.Content title={title} color="#fff" />
    </Appbar.Header>
  );
};

export default Header;
