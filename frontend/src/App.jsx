import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Sargodha Ads</h1>
      <p>Buy and sell locally in Sargodha.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;