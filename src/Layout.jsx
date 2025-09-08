// Layout.jsx
import Header from "./components/custom/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
