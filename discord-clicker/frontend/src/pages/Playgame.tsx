import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "../compontents/Spinner";
import Navbar from "../compontents/Navbar";

const Playgame = () => {
  const [user, setUser] = useState({
    username: "",
    avatar: "",
    id: "",
  });

  const { guildId } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect((): any => {
    const token = Cookies.get("token");

    if (!token) {
      return (window.location.href =
        "https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read");
    }

    if (token) {
      axios
        .post("http://localhost:3000/gameusers", { token, guildId })
        .then((res: any) => {
          console.log(res.data);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
    return;
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="game">
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Playgame;
