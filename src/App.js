import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { StyledLayout } from './components/Styled';
import { Makes } from './components/Makes';
import { Models } from './components/Models';
import { Vehicles } from './components/Vehicles';

import './App.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const VehiclesContext = React.createContext();

function App() {
  const [state, setState] = React.useState({
    make: '',
    model: '',
    vehicle: {}
  });

  return (
    <QueryClientProvider client={queryClient}>
      <VehiclesContext.Provider value={{
        state,
        setState
      }}>
        <div className="App">
          <StyledLayout>
            {/* zamiast selectow zrobic filtrowane karty z logo i nazwą */}
            {!state.make && <Makes />}
            {state.make && !state.model && <Models />}
            {state.make && state.model && <Vehicles />}
          </StyledLayout>
        </div>
      </VehiclesContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
