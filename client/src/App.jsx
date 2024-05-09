import { RouterProvider } from "react-router-dom";
import Web3StateProvider from "./context/Web3StateProvider";
import { routes } from "./routes/routes";
function App() {
  return (
    <div className="bg-primaryBg">
      <Web3StateProvider>
        <RouterProvider router={routes}></RouterProvider>
      </Web3StateProvider>
    </div>
  );
}

export default App;
