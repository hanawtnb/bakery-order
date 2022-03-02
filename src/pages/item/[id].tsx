import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { ItemQUERY } from "api/query";
import getConfig from "next/config";

import { Header } from "src/components/organisms/layout/Header";
import Count from "src/components/molecules/Quantity";
import PrimaryButton from "src/components/atoms/button/PrimaryButton";

const Item: NextPage = () => {
  const router = useRouter();
  const { id: item_id } = router.query;
  const { data, error, loading } = useQuery(ItemQUERY);
  const { publicRuntimeConfig: config } = getConfig();

  const item = data?.items?.data.find((item: any) => item?.id === item_id);

  return (
    <>
      <Header />
      <h4>{item?.attributes.name}</h4>
      {item?.attributes.image.data.map(({ attributes: att }: any) => (
        <img src={`${config.api}${att?.url}`} key={att?.id} />
      ))}
      <p>{item?.attributes.description}</p>
      <p>{item?.attributes.price}円</p>
      <Count />
      <PrimaryButton />
    </>
  );
};

export default Item;
