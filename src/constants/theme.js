import { Platform } from 'react-native';
import { configureFonts, MD3LightTheme } from 'react-native-paper';

const fontConfig = {
    customVariant: {
      fontFamily: Platform.select({
        android: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'Roboto,sans-serif',
      }),
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 22,
      fontSize: 15,
    }
  };

export const theme = {
    colors: {
      primary: '#3498db',
      accent: '#f1c40f',
      background: '#ecf0f1',
      text: '#2c3e50',
    },
    ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
    
  };
  