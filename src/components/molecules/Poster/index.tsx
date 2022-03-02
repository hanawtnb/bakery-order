import React, { memo, VFC } from "react";
import getConfig from "next/config";

import styles from "./styles.module.scss";
import Quantity from "../Quantity";
import { useQuery } from "@apollo/client";
import { ItemQUERY } from "api/query";
import Link from "next/link";

export const Poster = () => {
  const { data, error, loading } = useQuery(ItemQUERY);
  const { publicRuntimeConfig: config } = getConfig();

  const onClickToDetail = () => {};
  return (
    <div className={styles["poster"]} onClick={onClickToDetail}>
      {data?.items?.data.map(({ attributes, id }: any) => (
        <Link key={id} href={{ pathname: "/item/[id]", query: { id } }}>
          <a>
            <div>
              <h4>{attributes.name}</h4>
              {attributes.image.data.map(({ attributes: att }: any) => (
                <img src={`${config.api}${att?.url}`} key={att?.id} />
              ))}
              <p>{attributes.description}</p>
              <p>{attributes.price}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default memo(Poster);
