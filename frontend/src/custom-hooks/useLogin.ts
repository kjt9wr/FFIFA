import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { fetchLogin } from "../api/api.service";

export const useLogin = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    await fetchLogin(username, password)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));

        // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  return { login, error, isLoading };
};
