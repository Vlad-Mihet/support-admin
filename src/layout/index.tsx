import { Navbar } from "./components";
import styles from "./index.module.scss";

import type { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.layout}>
    <Navbar />
    <main>{children}</main>
  </div>
);

export default Layout;
