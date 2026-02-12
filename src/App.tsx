import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { FileProvider } from "./context/FileContext";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
