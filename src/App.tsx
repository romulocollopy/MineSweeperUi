import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { environment } from './lib/relay-environment';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}

export default App;
