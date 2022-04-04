import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: string;
  placeholder: string;
  label?: string;
  register: UseFormRegisterReturn; //value(テキストボックスの値と紐づけ用)
  errorMessage?: string; //エラーメッセージ(errors.registers?.messageの形で渡す)
};

/**
 * バリデーション付きのInputコンポーネント
 */
export const PrimaryInput: FC<Props> = ({
  type,
  placeholder,
  label,
  register,
  errorMessage,
}) => {
  return (
    <div>
      <p>{label}</p>
      <input type={type} placeholder={placeholder} {...register} />
      <p>{errorMessage}</p>
    </div>
  );
};
