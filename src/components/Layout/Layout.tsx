import { FC, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutType {
  children: ReactNode;
}
const Layout: React.FC<LayoutType> = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;