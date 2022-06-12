import 'react-native-gesture-handler'
import React from 'react';
import { store, persistor } from './src/Redux/store';
import { Provider } from 'react-redux';
import MainNav from './src/Navigation/MainNavigation';
import { PersistGate } from 'redux-persist/integration/react';


const App = () =>
{

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNav />
        </PersistGate>
      </Provider>
    </>
  );
};



export default App;
