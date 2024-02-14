import {StyleSheet} from 'react-native';
import {theme} from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fonts.customVariant.fontSize,
    fontFamily: theme.fonts.customVariant.fontFamily,
    fontWeight: theme.fonts.customVariant.fontWeight,
    letterSpacing: theme.fonts.customVariant.letterSpacing,
    lineHeight: theme.fonts.customVariant.lineHeight,
  },
});

export default styles;
