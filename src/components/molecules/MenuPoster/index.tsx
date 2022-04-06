import React, { FC, useCallback, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import getConfig from "next/config";
import { useRecoilState } from "recoil";

import styles from "./styles.module.scss";
import PrimaryButton from "src/components/atoms/button/PrimaryButton";
import Quantity from "../Quantity";
import { UpdateCartMUTATION } from "src/api/query";
import { useCartsQuery, useMenusQuery } from "src/types/generated/graphql";
import { cartState } from "../../../store/cartAtom";

type Props = {
  id: number;
  attributes: any;
};

const MenuPoster: FC<Props> = ({ id, attributes }) => {
  const { publicRuntimeConfig: config } = getConfig();
  const [qty, setQty] = useState(0);
  const [userId, setUserId] = useState("");
  const [cartList, setCartList]: Array<any> = useRecoilState(cartState);
  const [addCart, { error }] = useMutation(UpdateCartMUTATION, {
    onCompleted: (res) => {
      error && console.log(error);
    },
  });

  useEffect(() => {
    setUserId(localStorage.getItem("userId") as string);
  }, []);

  // const { data: cartData } = useCartsQuery({
  //   variables: {
  //     filters: {
  //       users_permissions_user: {
  //         id: {
  //           eq: userId,
  //         },
  //       },
  //     },
  //   },
  // });

  const onClickAddCart = (attribute: any) => {
    console.log("ID", id);
    setCartList(
      cartList
        ? [...cartList, { ...attribute, quantity: qty }]
        : [{ ...attribute, quantity: qty }]
    );
    // addCart({
    //   variables: {
    //     updateCartId: cartData?.carts?.data[0].id,
    //     data: {
    //       item: {
    //         data: {
    //           attributes: [
    //             {
    //               id,
    //               qty,
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   },
    // });
  };
  console.log("カートの中身", cartList);

  return (
    <div className={styles["poster"]} key={id}>
      <div>
        <h4>{attributes.name}</h4>
        {attributes.image.data.map(({ attributes: att, id }: any) => (
          <img src={`${config.api}${att?.url}`} key={id} />
        ))}
        <p>{attributes.description}</p>
        <p>{attributes.price}</p>
      </div>
      <Quantity qtyFunc={(qty) => setQty(qty)} />
      <PrimaryButton onClick={() => onClickAddCart(attributes)}>
        カートに入れる
      </PrimaryButton>
      <PrimaryButton>削除</PrimaryButton>
    </div>
  );
};
export default MenuPoster;
