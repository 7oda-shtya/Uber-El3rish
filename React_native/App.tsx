import './src/global.css';
import { useEffect } from 'react';
import { I18nManager, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import { restoreSession } from './src/redux/slices/client/authSlice';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function AppContent() {
  const dispatch = useDispatch();
  const sessionChecked = useSelector(state => state.auth.sessionChecked);

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  if (!sessionChecked) {
    return (
      <View className='flex-1 items-center justify-center bg-black'>
        <ActivityIndicator size='large' color='#22D3EE' />
      </View>
    );
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
}