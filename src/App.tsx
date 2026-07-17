import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Playground from "./pages/Playground";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Playground />} />
      </Routes>
    </Layout>
  );
}

export default App;
