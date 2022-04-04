import React, { useState } from "react";
import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { RegisterMUTATION } from "api/query";
import { useForm } from "react-hook-form";

interface IFormInput {
  userName: String;
  email: String;
  password: String;
}

const SignUp: NextPage = () => {
  // const [form, setForm] = useState({ email: "", password: "", username: "" });

  const [signup, { loading }] = useMutation(RegisterMUTATION, {
    onCompleted: (res) => {
      console.log(res);

      localStorage.setItem("token", res.register.jwt);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
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
    console.log(errors);
  };

  return (
    <div>
      {loading && <div>loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="userName"
          placeholder="userName"
          {...register("userName", { required: true })}
          // {...(errors.email && "Email is required")}
        />
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
    </div>
  );
};

export default SignUp;
