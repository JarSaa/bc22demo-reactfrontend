import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { NavLink, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const TapahtumaList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [info, setInfo] = useState('');
    const token = localStorage.getItem('token');
    const [osumma, setOSumma] = useState('');
    const [o2summa, setO2Summa] = useState('');
    const [hsumma, setHSumma] = useState('');
    const [asumma, setASumma] = useState('');
       
         
    
    useEffect(() => {
        const fetchData = async () => {
            
            setLoading(true)
            //console.log(year_id)
            try {
                const { data: response } = await axios.get(apiURL + '/tapahtuma', {
                   headers: { "Authorization": `Bearer ${token}` } 
                //    const { data: response } = await axios.get(apiURL + '/yeartapahtuma/'+year_id, {
                //        headers: { "Authorization": `Bearer ${token}` } 
                })
                setData(response);
                //console.log(data[0].KESTO_TUNTEINA);
                let o = 8;
                let o2 = 9;
                let h = 10;
                let a = 11;
                data.map(x => (o= o + x.OS_MAARA_YHTEENSA));
                data.map(x => (o2= o2 + x.OS_MAARA_ALLE29));
                data.map(x => (h= h + x.KESTO_TUNTEINA));
                data.map(x => (a= a + x.AUTETTUJA));
                //console.log(s)

                setOSumma(o);
                setO2Summa(o2);
                setHSumma(h);
                setASumma(a);
                //console.log(s);
            } catch (error) {
                console.error(error.message);
                setInfo("Kirjaudu nähdäksesi tapahtumat!");
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <Link to='/addtapahtuma'><button className='btn btn-success'>Uusi tapahtuma</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Nro</th><th>Nimi</th><th>Pvm</th><th>Os. määrä yht.</th><th>Os. määrä alle 29v.</th><th>Kesto h</th><th>Autettuja</th><th>Muokkaa</th>
                    </tr>
                </thead>
                <tbody>
                     {data.map(tapahtuma => (
                            <tr key={tapahtuma.tapahtuma_id}>
                            <td>{tapahtuma.tapahtuma_id}</td>
                            <td>{tapahtuma.tapahtuma_nimi}</td>
                            <td>{tapahtuma.tapahtuman_pvm}</td>
                            <td>{tapahtuma.os_maara_yhteensa}</td>
                            <td>{tapahtuma.os_maara_alle29}</td>
                            <td>{tapahtuma.kesto_tunteina}</td>
                            <td>{tapahtuma.AUTETTUJA}</td>
                            <td><NavLink to={`SelectedTapahtuma/${tapahtuma.tapahtuma_id}`}>
                                <button className="btn btn-info">Valitse...</button>
                                </NavLink>
                            </td>
                        </tr> 
                    ))} 
                    <tr><td colSpan="3"> Yht.</td><td>{osumma}</td><td>{o2summa}</td><td>{hsumma}</td><td>{asumma}</td>
                    </tr>
                </tbody>
            </table>
            
            <p>{info}</p>
        </div>

    )

}





export default TapahtumaList;
