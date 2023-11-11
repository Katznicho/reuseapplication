
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/dev';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContent from './src/AppContext';
import { PaperProvider } from 'react-native-paper';
import { useUserPreferredTheme } from './src/hooks/useUserPreferredTheme';
import FlashMessage from 'react-native-flash-message';



const App = () => {
  //  const {} =  useUserPreferredTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider >
           <AppContent/>
           <FlashMessage position="top" animated />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>

  )
}

export default App

