import { useQuery } from "@apollo/client";
import { MenuQUERY } from "api/query";
import React from "react";
import getConfig from "next/config";

import styles from "./styles.module.scss";
import PrimaryButton from "src/components/atoms/button/PrimaryButton";
import Quantity from "../Quantity";

const MenuPoster = () => {
  const { data, error, loading } = useQuery(MenuQUERY);
  const { publicRuntimeConfig: config } = getConfig();
  console.log("これ", data);

  return (
    <>
      <div className={styles["poster"]}>
        {data?.menu?.data.attributes?.items.data.map(
          ({ attributes, id }: any) => (
            <>
              <div key={id}>
                <h4>{attributes.name}</h4>
                {attributes.image.data.map(({ attributes: att, id }: any) => (
                  <img src={`${config.api}${att?.url}`} key={id} />
                ))}
                <p>{attributes.description}</p>
                <p>{attributes.price}</p>
              </div>
              <Quantity />
              <PrimaryButton>カートに入れる</PrimaryButton>
              <PrimaryButton>削除</PrimaryButton>
            </>
          )
        )}
      </div>
    </>
  );
};

export default MenuPoster;
