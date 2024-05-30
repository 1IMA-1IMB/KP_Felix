import React, { useEffect } from "react";
import Spinner from "../compontents/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function useQuery(): any | URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Autht: React.FC = (): JSX.Element => {
  const query = useQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      Cookies.remove("token");
    }

    const code = query.get("code");

    if (!code) return navigate("/");

    axios
      .post("http://localhost:3000/register", { code })
      .then((res: any) => {
        if (!res.data.token) {
          navigate("/");
        } else {
          Cookies.set("token", res.data.token);

          navigate("/");
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
};

export default Autht;
