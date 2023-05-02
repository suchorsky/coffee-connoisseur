import '@/styles/globals.css';
import { ContextState } from '@/types/contextState';
import type { AppProps } from 'next/app';
import { Dispatch, createContext, useReducer } from 'react';
interface Props {
  children: React.ReactNode;
}
interface StoreContextProps {
  state: ContextState;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreContextProps | null>(null);

const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFE_STORE: 'SET_COFFE_STORE',
};

interface SetLatLongAction {
  type: typeof ACTION_TYPES.SET_LAT_LONG;
  payload: string;
}

interface SetCoffeStoreAction {
  type: typeof ACTION_TYPES.SET_COFFE_STORE;
  //it should be a coffe store type TODO
  payload: any;
}

type Action = SetLatLongAction | SetCoffeStoreAction;

const storeReducer = (state: ContextState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    }
    case ACTION_TYPES.SET_COFFE_STORE: {
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const initialState: ContextState = {
    latLong: '',
    coffeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps}></Component>
    </StoreProvider>
  );
}
