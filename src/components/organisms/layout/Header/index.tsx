import Link from "next/link";

import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <>
      <nav className={styles["navBar"]}>
        <div className={styles["container"]}>
          <Link href="/">
            <a className={styles["title"]}>Grain de ble</a>
          </Link>

          <ul>
            <li>
              <Link href="/">
                <a>注文</a>
              </Link>
            </li>

            <li>
              <Link href="">
                <a>ログイン</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>新規登録</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>ログアウト</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
