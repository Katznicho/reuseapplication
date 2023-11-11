// Define types for colors
export interface Colors {
  primaryBackground: string;
  secondaryBackground: string;
  primaryForeground: string;
  secondaryForeground: string;
  foregroundContrast: string;
  primaryText: string;
  secondaryText: string;
  hairline: string;
  grey0: string;
  grey3: string;
  grey6: string;
  grey9: string;
  red: string;
  transparent: string;
}

// Define types for spaces
export interface Spaces {
  horizontal: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  vertical: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
}

// Define types for font sizes
export interface FontSizes {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

// Define types for font weights
export interface FontWeights {
  s: string;
  m: string;
  l: string;
}

// Define types for icons
export interface Icons {
  [key: string]: any;
}

//create a notification interface
export interface NotificationInterface {

  type: string;
  description: string;
  time: string;
  id: number;
}


// Define types for the entire reuseTheme object
export interface ReuseTheme {
  colors: {
    light: Colors;
    'no-preference': Colors;
    dark: Colors;
    preference: Colors;
  };
  spaces: Spaces;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  icons: Icons;
  button: {
    borderRadius: number;
  };
  roundness: number;
  dimensions: {
    width: number;
    height: number;
  }
}

export interface commentInterface {
  imageURL: string;
  time: string;
  comment: string;
  rating: number;
}

export interface TabInterface {
  name: string;
  screen: string;
}

export interface SignupField {
  displayName: string;
  type: 'ascii-capable' | 'default' | 'email-address'; // Define other types as needed
  editable: boolean;
  regex?: RegExp; // You can define a regex pattern here if required
  key: string;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Define other options as needed
}

export interface RedirectParams {
  status: 'successful' | 'cancelled';
  transaction_id?: string;
  tx_ref: string;
}