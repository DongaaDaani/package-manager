
import './input.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Navigation/Layout';
import PackageIndex from './Package/PackageIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="packages" element={<PackageIndex />} />
     
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
