import React, { FC, useCallback, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import getConfig from "next/config";
import { useRecoilState } from "recoil";

import styles from "./styles.module.scss";
import PrimaryButton from "src/components/atoms/button/PrimaryButton";
import Quantity from "../Quantity";
import { UpdateCartMUTATION } from "src/api/query";
import { cartState } from "../../../store/cartAtom";
import { userIdState } from "../../../store/userAtom";
import { useCartsQuery } from "src/types/generated/graphql";

const { publicRuntimeConfig: config } = getConfig();

type Props = {
  id: number;
  attributes: any;
};

const MenuPoster: FC<Props> = ({ id, attributes }) => {
  console.log("nani", id);

  const [qty, setQty] = useState(0);

  const [userId, setUserId] = useRecoilState(userIdState);

  const [addCart] = useMutation(UpdateCartMUTATION);

  useEffect(() => {
    setUserId(localStorage.getItem("userId") as string);
  }, [setUserId]);

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

  console.log("かーと", cartData?.carts?.data[0].id);

  const onClickAddCart = (itemInfo: any) => {
    addCart({
      variables: {
        updateCartId: "4",
        data: {
          item: {
            data: {
              attributes: [
                // 　既にある商品を取り除いて、上書きする。
                ...cartData?.carts?.data?.[0]?.attributes?.item?.data?.attributes?.filter(
                  ({ id: i }: any) => i !== id
                ),
                { id, itemInfo, qty },
              ],
            },
          },
        },
      },
    });
  };

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
