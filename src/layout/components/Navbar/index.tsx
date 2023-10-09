import styles from "./index.module.scss";

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.wrapper}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <button>
        <span>Menu</span>
      </button>
    </div>
  </nav>
);

export default Navbar;
