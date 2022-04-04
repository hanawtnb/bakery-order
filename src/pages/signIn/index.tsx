import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginMUTATION } from "api/query";
import { PrimaryInput } from "src/components/atoms/input";

interface IFormInput {
  firstName: String;
  email: String;
  password: String;
}

const SignIn: NextPage = () => {
  const router = useRouter();
  const [signin, { loading, error }] = useMutation(LoginMUTATION, {
    onCompleted: (res) => {
      localStorage.setItem("token", res.login.jwt);
      error && console.log(error);
    },
  });

  /**
   * バリデーション.
   */
  let schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput | any>({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => {
    console.log(data);
    signin({
      variables: {
        input: {
          identifier: data.email,
          password: data.password,
        },
      },
    });
    console.log(errors);
    router.push("/menu");
  };

  return (
    <>
      <div>SignIn</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <input type="submit" />
      </form>
    </>
  );
};

export default SignIn;
