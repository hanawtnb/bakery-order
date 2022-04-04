import React, { useState } from "react";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { RegisterMUTATION } from "api/query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.scss";
import { PrimaryInput } from "../../components/atoms/input/index";
interface IFormInput {
  userName: String;
  email: String;
  password: String;
}

const SignUp: NextPage = () => {
  // const [form, setForm] = useState({ email: "", password: "", username: "" });

  const [signup, { loading }] = useMutation(RegisterMUTATION, {
    onCompleted: (res) => {
      localStorage.setItem("token", res.register.jwt);
    },
  });

  /**
   * バリデーション.
   */
  let schema = yup.object().shape({
    userName: yup.string().required("Please enter your user name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  /**
   * フォームの送信.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput | any>({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => {
    console.log(data);
    signup({
      variables: {
        input: {
          username: data.userName,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <div>
      {loading && <div>loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["signUp"]}>
          <PrimaryInput
            type="text"
            placeholder="User Name"
            label="User Name"
            register={register("userName")}
            errorMessage={errors.userName?.message}
          />
          <PrimaryInput
            type="email"
            placeholder="Email"
            label="Email"
            register={register("email")}
            errorMessage={errors.email?.message}
          />
          <PrimaryInput
            type="password"
            placeholder="Password"
            label="Password"
            register={register("password")}
            errorMessage={errors.password?.message}
          />
          <PrimaryInput
            type="password"
            placeholder="Confirmation Password"
            label="Confirmation Password"
            register={register("confirmationPassword")}
            errorMessage={errors.confirmationPassword?.message}
          />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
