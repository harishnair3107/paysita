// components/ThemeView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeView = ({ children, style, textStyle }) => {
  const { theme } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: theme === 'dark' ? '#000' : '#fff' },
    style,
  ];

  const themedTextStyle = {
    color: theme === 'dark' ? '#fff' : '#000',
    ...textStyle,
  };

  return (
    <View style={containerStyle}>
      {React.Children.map(children, child =>
        typeof child === 'string' ? (
          <Text style={themedTextStyle}>{child}</Text>
        ) : (
          child
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ThemeView;
