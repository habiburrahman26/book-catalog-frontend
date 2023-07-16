import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useLoginMutation,
} from "../redux/features/auth/authApi";
import { ErrorApiResponseType } from "../types/common";
import Error from "../components/ui/Error";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const [error, setError] = useState<ErrorApiResponseType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError(responseError?.data);
    }

    if (data?.data?.accessToken) {
      navigate("/");
    }
  }, [data, navigate, responseError]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError(undefined);
    login(data);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 pt-10 min-h-[calc(100vh-12vh)] mx-auto">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign In your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="example@gmail.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.password?.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-4 w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="loading loading-spinner loading-sm text-white"></span>
                )}
                <span>Sign In</span>
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have account yet?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div>
          {error?.errorMessages && (
            <Error message={error?.errorMessages?.[0]?.message} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
