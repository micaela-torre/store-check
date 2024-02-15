import { Card, Paragraph, Title } from 'react-native-paper';
import styles from '../styles/globalStyle';

export const CardItem = ({ title, description, children }) => {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Content>
        {title && <Title style={styles.text}>{title}</Title>}
        {description && <Paragraph>{description}</Paragraph>}
        {children}
      </Card.Content>
    </Card>
  );
};
