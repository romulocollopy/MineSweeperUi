import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { environment } from './lib/relay-environment';
import HomePage from './pages/HomePage';
import MineSweeper from './pages/MineSweeper';

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:gameSlug" element={<MineSweeper />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}

export default App;
