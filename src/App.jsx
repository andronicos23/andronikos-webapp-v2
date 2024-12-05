import "./App.css";
import PageNotFound from "./components/PageNotFound";
import UserDetails from "./components/UserDetails";

import UserList from "./components/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersProvider } from "./context/UsersContext";

function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserList />} />
          <Route path="user-details/:id" element={<UserDetails />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}

export default App;
