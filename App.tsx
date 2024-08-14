import { Init } from './src/navigation';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NetworkWrapper } from './src/components/NetworkWrapper';

export default function App() {
  return (
    <Provider store={store}>
      <NetworkWrapper>
        <ToastProvider>
          <Init />
        </ToastProvider>
      </NetworkWrapper>
    </Provider>
  );
}
