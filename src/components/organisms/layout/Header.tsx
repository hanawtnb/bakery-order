import Link from "next/link";

export const Header = () => {
  return (
    <>
      <nav className="navBar">
        <div className="container">
          <Link href={"/"}>
            <a className="title">Grain de ble</a>
          </Link>

          <ul>
            <li>
              <Link href={"/"}>
                <a>注文</a>
              </Link>
            </li>

            <li>
              <Link href={""}>
                <a>ログイン</a>
              </Link>
            </li>
            <li>
              <Link href={""}>
                <a>新規登録</a>
              </Link>
            </li>
            <li>
              <Link href={""}>
                <a>ログアウト</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
