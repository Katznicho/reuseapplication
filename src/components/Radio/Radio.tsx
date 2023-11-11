import React, { useState } from 'react'
import dynamicStyles from './styles'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { TouchableOpacity, View } from 'react-native'

/**
 * Renders a custom radio button component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - enabled: a boolean indicating whether the button is enabled
 *   - onToggle: a function to handle the button toggle event
 *   - containerStyle: optional styling for the button container
 *   - width: optional width of the button
 *   - height: optional height of the button
 *   - toggle: a function to toggle the button
 * @return {JSX.Element} The rendered custom radio button component.
 */
const MyRadioButton = ({
  enabled,
  onToggle,
  containerStyle,
  width,
  height,
  toggle
}: any) => {

  const { reuseTheme } = useUserPreferredTheme();
  const styles = dynamicStyles(reuseTheme);

  // const [isEnabled, setIsEnabled] = useState(enabled)

  // const toggle = () => {
  //   setIsEnabled((previousState:any) => !previousState)
  //   onToggle && onToggle(!isEnabled)
  // }

  const innerSizeStyle = {
    width: width || 24,
    height: height || 24,
    borderRadius: (width || 24) / 2,
  }

  const outerSizeStyle = {
    borderRadius: (width || 24) / 2 + 4,
  }

  return (
    <TouchableOpacity
      style={[
        styles.outerContainer,
        containerStyle,
        outerSizeStyle,
        {
          borderColor: enabled ? reuseTheme.colors.preference.primaryForeground : reuseTheme.colors.preference.grey3
        }
      ]}
      onPress={toggle}>
      <View
        style={
          enabled
            ? [styles.innerContainerSelected, innerSizeStyle,

            ]
            : [styles.innerContainerUnselected, innerSizeStyle]
        }></View>
    </TouchableOpacity>
  )
}

export default MyRadioButton;

// export default memo(useDopebase(Radio, dynamicStyles))
