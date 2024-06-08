import { SafeAreaView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type SafeViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function SafeView({ style, lightColor, darkColor, ...otherProps }: SafeViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
