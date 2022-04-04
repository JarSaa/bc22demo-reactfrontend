import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PreYearTapahtumaList  = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [info, setInfo] = useState('');
    const token = localStorage.getItem('token');
    const [osumma, setOSumma] = useState([]);
    const [o2summa, setO2Summa] = useState([]);
    const [hsumma, setHSumma] = useState([]);
    const [asumma, setASumma] = useState();
    const {year_id}=useParams();
    //const navigate=useNavigate();
    //const navigate=useNavigate();
    
    
    useEffect(() => {
            const fetchData = async () => {
            setLoading(true)
            console.log("Moi " + year_id)
            try {
                const { data: response } = await axios.get(apiURL + '/preyeartapahtuma', {
                    headers: { "Authorization": `Bearer ${token}` }                
                })
                setData(response);
               
                let o = 0;
                let o2 = 0;
                let h = 0;
                let a = 0;
                data.map(x => (o+=x.os_maara_yhteensa));
                data.map(x => (o2= o2 + x.os_maara_alle29));
                data.map(x => (h= h + x.kesto_tunteina));
                data.map(x => (a= a + x.autettuja));
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
            <Link to='/addtapahtuma'><button className='btn btn-success'>Uusi tapahtuma...</button></Link>
            
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
                             <td>{tapahtuma.autettuja}</td>
                             <td><NavLink to={`../tapahtuma/SelectedTapahtuma/${tapahtuma.tapahtuma_id}`}>
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





export default PreYearTapahtumaList;
