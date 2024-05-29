import React, { useEffect } from "react";
import Spinner from "../compontents/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Setup: React.FC = (): JSX.Element => {

  const navigate = useNavigate()
  const { guildId } = useParams()

  useEffect(() => {

    axios
      .post('http://localhost:3000/botservers', { guildId })
      .then((res) => {
        if(res.data.code === 200) {
          navigate('/game/guild/'+guildId)
        }   
        else if (!res.data.code){
          window.location.href = 'https://discord.com/oauth2/authorize?client_id=1243668312597074021&permissions=8&scope=bot&guild_id='+guildId
        }
      })
      .catch((err: Error) => {
        console.log(err)
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1243668312597074021&permissions=8&scope=bot&guild_id='+guildId
      })
  }, [])

  return <div>
    <Spinner />  
  </div>;
};

export default Setup;
