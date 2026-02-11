import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { FileProvider } from "./context/FileContext";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <FileProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/preview" element={<Preview />} />
            </Route>
          </Routes>
        </FileProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
