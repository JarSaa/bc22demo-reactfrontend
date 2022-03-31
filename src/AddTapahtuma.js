import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useNavigate } from "react-router-dom";

const AddTapahtuma = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    //const [tapahtuma_id, SetTapahtumaId] = useState('');
    const [name, setName] = useState('');
    const [pvm, setPvm] = useState('');
    const [maara, setMaara] = useState('');
    const [o2maara, setO2Maara] = useState('');
    const [umaara, setUMaara] = useState('');
    const [hmaara, setHMaara] = useState('');
    const [amaara, setAMaara] = useState('');
    //const {id}=useParams();
    const navigate=useNavigate();
    const token = localStorage.getItem('token');

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
             nimi: name,
             pvm: pvm,
             maara: maara,
             maara29: o2maara,
             uusia: umaara,
             tunti: hmaara,
             autettuja: amaara
        }
        
        axios.post(apiURL + '/tapahtuma/', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                setName('');
                setPvm('');
                setMaara('');
                setO2Maara('');
                setHMaara('');
                setAMaara('');
                setLoading(false);
                //return navigate("/booklist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                        <th>Nimi</th><th>Pvm</th><th>Os. määrä yht.</th><th>Os. määrä alle 29v.</th><th>Os. määrä uusia</th><th>Kesto h</th><th>Autettuja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="name" value={name} onChange={e => setName(e.target.value)} /></td>
                        <td><input type="text" id="pvm" value={pvm} onChange={e => setPvm(e.target.value)} /></td>
                        <td><input type="text" id="maara" value={maara} onChange={e => setMaara(e.target.value)} /></td>
                        <td><input type="text" id="o2maara" value={o2maara} onChange={e => setO2Maara(e.target.value)} /></td>
                        <td><input type="text" id="umaara" value={umaara} onChange={e => setUMaara(e.target.value)} /></td>
                        <td><input type="text" id="hmaara" value={hmaara} onChange={e => setHMaara(e.target.value)} /></td>
                        <td><input type="text" id="amaara" value={amaara} onChange={e => setAMaara(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Tallenna</button>
            {isError}
        </div>
    )
}

export default AddTapahtuma;