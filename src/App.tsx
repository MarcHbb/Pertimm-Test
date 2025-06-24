import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-green-700">
                Hello World from Saurabh!
              </h1>
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-red-700">
                The resource you are looking for is not found :(
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;