import {Card, Paragraph, Title} from 'react-native-paper';

export const CardItem = ({title, description, children}) => {
  return (
    <Card style={{margin: 8}}>
      <Card.Content>
        {title && <Title>{title}</Title>}
        {description && <Paragraph>{description}</Paragraph>}
        {children}
      </Card.Content>
    </Card>
  );
};
