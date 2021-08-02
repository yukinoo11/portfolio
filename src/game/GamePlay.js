import React, { useEffect } from "react";
import axios from 'axios';

const GamePlay = (props) => {
    const { match } = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/game/play/${match.params.id}`);
            const script = document.createElement("script");
            script.append(result.data.js)
            script.async = true;
            document.getElementById('game').appendChild(script);

            const axiosScript = document.createElement("script");
            axiosScript.type='text/javascript';
            axiosScript.src = 'https://unpkg.com/axios/dist/axios.min.js';
            document.head.appendChild(axiosScript)
        }

        fetchData();
        return() => {
            const canvas = document.body.getElementsByTagName('canvas')[0];
            if(canvas){
                document.body.removeChild(canvas)
            }
        }
    }, [match.params.id]);

    const fetchRank = ( level ) => {
        const fetchData = async ( level ) => {
            const result = await axios.post(`/api/game/rank/`,{
                gameKey : 'findColor',
                level : level
            });
            console.log('결과', result)
        }

        fetchData(level);
    };

    return(
        <div id='game'>dd</div>
    )
}

export default GamePlay;
