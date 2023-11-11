import React from 'react';
import { Button } from 'react-native-paper';

//buttonInterface
type buttonMode = 'text' | 'contained' | 'outlined';

interface ButtonInterface {
  icon?: string;
  color?: string;
  text: string;
  mode?: buttonMode;
  onPress?: any;
  fullWidth?: boolean;
  disabled?: boolean;
  style: any;
  noReverse?: boolean;
  contentStyle?: any;
}

const ButtonComponent = ({
  icon,
  color,
  text,
  mode,
  onPress,
  fullWidth,
  disabled,
  style,
  contentStyle,
  noReverse,
}: ButtonInterface) => {
  return (
    <Button
      contentStyle={{
        flexDirection: noReverse ? 'row' : 'row-reverse',
        width: fullWidth && '100%',
        ...contentStyle,
      }}
      icon={icon}
      mode={mode}
      color={color}
      uppercase={false}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
