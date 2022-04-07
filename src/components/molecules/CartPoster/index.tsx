import React from "react";
import getConfig from "next/config";
import { useRecoilState } from "recoil";

import styles from "./styles.module.scss";
import { useCartsQuery } from "src/types/generated/graphql";
import { userIdState } from "src/store/userAtom";

// カートの中身を表示するコンポーネント
const CartPoster = () => {
  const { publicRuntimeConfig: config } = getConfig();
  // ユーザーID
  const [userId] = useRecoilState(userIdState);

  // ユーザーIDに対応するカートIDを取得
  const { data: cartData } = useCartsQuery({
    variables: {
      filters: {
        users_permissions_user: {
          id: {
            eq: userId,
          },
        },
      },
    },
  });

  // カートの中身
  const cartItems = cartData?.carts?.data[0]?.attributes?.item;

  return (
    <div className={styles["cart"]}>
      <p>Cart</p>
      {cartItems ? (
        cartItems?.data?.attributes.map((item: any) => {
          return (
            <div key={item?.id}>
              <p>{item?.itemInfo.name}</p>
              {item?.itemInfo.image.data.map((img: any) => {
                return (
                  <img
                    src={`${config.api}${img.attributes.url}`}
                    key={img.id}
                  />
                );
              })}
              <p>{item?.itemInfo.price}</p>
              <p>{item?.qty}個</p>
            </div>
          );
        })
      ) : (
        <p>カートに商品はありません</p>
      )}
    </div>
  );
};

export default CartPoster;
