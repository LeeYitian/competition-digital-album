import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { FlipBookProvider } from "./context/FlipBookProvider";

function App() {
  return (
    <FlipBookProvider>
      <RouterProvider router={router} />
    </FlipBookProvider>
  );
}

export default App;
