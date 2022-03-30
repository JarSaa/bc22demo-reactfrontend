import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { NavLink, Link } from 'react-router-dom';

const TapahtumaList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [info, setInfo] = useState('');
    const token = localStorage.getItem('token');
    const [summa, setSumma] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(apiURL + '/tapahtuma', {
                    headers: { "Authorization": `Bearer ${token}` } 
                })
                setData(response);
                //console.log("Dataaaa"+data);
                //console.log(data[0].KESTO_TUNTEINA);
                let s=0;
                data.map(x => (s+=x.KESTO_TUNTEINA));
                //console.log(s)
                setSumma(s);
                console.log(s)
            } catch (error) {
                console.error(error.message);
                setInfo("You need to login to see the books!");
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <Link to='/addtapahtuma'><button className='btn btn-primary'>Uusi tapahtuma</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Nro</th><th>Nimi</th><th>Pvm</th><th>Os. määrä yht.</th><th>Os. määrä alle 29v.</th><th>Kesto h</th><th>Autettuja</th>
                    </tr>
                </thead>
                <tbody>
                     {data.map(tapahtuma => (
                            <tr key={tapahtuma.tapahtuma_id}>
                            <td>{tapahtuma.TAPAHTUMA_ID}</td>
                            <td>{tapahtuma.TAPAHTUMA_NIMI}</td>
                            <td>{tapahtuma.TAPAHTUMAN_PVM}</td>
                            <td>{tapahtuma.OS_MAARA_YHTEENSA}</td>
                            <td>{tapahtuma.OS_MAARA_ALLE29}</td>
                            <td>{tapahtuma.KESTO_TUNTEINA}</td>
                            <td>{tapahtuma.AUTETTUJA}</td>
                        </tr> 
                    ))} 
                    <tr><td colSpan="5"> Yht.</td><td>{summa}</td><td></td>
                    </tr>
                </tbody>
            </table>
            
            <p>{info}</p>
        </div>
    )
}

export default TapahtumaList;