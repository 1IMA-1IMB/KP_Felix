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

  const [game, setGame] = useState<any>({});

  const [money, setMoney ] = useState<any>()

  const navigate = useNavigate();

  const addMoney = () => {
    return setMoney(money + 1)
  }



  // useEffect(() => {
  //     const interval = setInterval(() => {
  //       if(!loading) {
      
  //         const token = Cookies.get('token')
      
  //         console.log('Saving...')
      
  //         console.log(money)
      
  //         axios
  //           .post('http://localhost:3000/updategamesave', { token, guildId, money})
  //             .then((res: any) => {
  //               console.log(res.data)
  //               console.log('Saved')
  //             })
  //             .catch((err: Error) => {
  //               console.log(err)
  //             })
  //         } else {
  //           return
  //         }
  //     }, 10000)

  //     return () => clearInterval(interval);
  // }, [])


  useEffect((): any => {
    const token = Cookies.get("token");

    if (!token) {
      window.location.href ="https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read";
    } else if (token) {
      axios
        .post("http://localhost:3000/gameusers", { token, guildId })
        .then((res: any) => {
          if (res.data.code === 200) {
            setUser({
              username: res.data.user.username,
              avatar: res.data.user.avatar,
              id: res.data.user.id,
            }); 
            setGame(res.data.game)
            console.log(res.data.game)
            setMoney(res.data.gameSave.money)
            setLoading(false)
          } else if (res.data.code === 500) {
            window.location.href ="https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read";
          }
          
          else {
            navigate("/");
          }
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
        <div className="game"style={{ backgroundColor: `${game.color}` }}>
          <div className="navbar flex justify-between items-center">
            <a href="/"><h1 className="text-white text-7xl font-bold italic ml-10">{game.name}</h1></a>
            <div className="profile flex items-center gap-10 mr-10">
              <h1 className="text-white text-3xl font-bold">{user.username}</h1>
              <img className="w-16 h-16 rounded-full" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} alt="" />
            </div>
          </div>
          <div className="content min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl text-white font-bold">You have {money} {game.currency}</h1>
            <h1 className="text-8xl mt-10 cursor-pointer select-none" onClick={addMoney}>{game.emoji}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playgame;
