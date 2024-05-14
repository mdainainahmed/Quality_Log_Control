import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { Home, Layout} from "./components/index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}></Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
}

export default App;
