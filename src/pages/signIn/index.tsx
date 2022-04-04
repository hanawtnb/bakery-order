import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { LoginMUTATION } from "api/query";

interface IFormInput {
  firstName: String;
  email: String;
  password: String;
}

const SignIn: NextPage = () => {
  const [signin, { loading, error }] = useMutation(LoginMUTATION, {
    onCompleted: (res) => {
      localStorage.setItem("token", res.login.jwt);
      error && console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
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
  };

  useEffect(() => {
    if (document) console.log(document.cookie);
  }, []);

  return (
    <>
      <div>SignIn</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          // {...(errors.email && "Email is required")}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true, min: 8 })}
          // {...(errors.password && "Password is required")}
        />

        <input type="submit" />
      </form>
    </>
  );
};

export default SignIn;
