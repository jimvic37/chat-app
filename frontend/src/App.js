import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
// import { StompSessionProvider } from "react-stomp-hooks";
import { AppContextProvider } from "./Contexts/AppContext";
import AuthGuard from "./components/Auth/AuthGuard.js";
// import UnAuthGuard from "./components/Auth/UnAuthGuard";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import CreateChat from "./components/CreateChat/CreateChat";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import Notifications from "./components/Notifications/Notifications";
import { Modal } from "./components/Modal";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route
          path="/chat"
          element={
            // <AuthGuard>

            <Chat />

            // </AuthGuard>
          }
        ></Route>
        <Route
          path="/chat/create"
          element={
            // <AuthGuard>
            <CreateChat />
            // </AuthGuard>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            // <AuthGuard>
            <Profile />
            // </AuthGuard>
          }
        ></Route>

        <Route
          path="/login"
          element={
            // <UnAuthGuard>
            <Login />
            // </UnAuthGuard>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            // <UnAuthGuard>
            <Signup />
            // </UnAuthGuard>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            // <UnAuthGuard>
            <Notifications />
            // </UnAuthGuard>
          }
        ></Route>
      </Route>
    )
  );

  return (
    <div>
      <AppContextProvider>
        <div className="App-container">
          <RouterProvider router={router} />
        </div>
        <Modal />
      </AppContextProvider>
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
