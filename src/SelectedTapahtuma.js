import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedTapahtuma = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tapahtuma_id, SetTapahtumaId] = useState('');
    const [name, setName] = useState('');
    const [pvm, setPvm] = useState('');
    const [maara, setMaara] = useState('');
    const [o2maara, setO2Maara] = useState('');
    const [umaara, setUMaara] = useState('');
    const [hmaara, setHMaara] = useState('');
    const [amaara, setAMaara] = useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    const token = localStorage.getItem('token');
    
    useEffect(() => {    
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/tapahtuma/'+id, {
                    headers: { "Authorization": `Bearer ${token}` } 
                })
                //setIdBook(id);
                SetTapahtumaId(id);
                console.log(response.tapahtuma_nimi);
                setName(response.tapahtuma_nimi);
                setPvm(response.tapahtuman_pvm);
                setMaara(response.os_maara_yhteensa);
                setO2Maara(response.os_maara_alle29);
                setUMaara(response.os_maara_uusia);
                setHMaara(response.kesto_tunteina);
                setAMaara(response.autettuja);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

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
         axios.put(apiURL + '/tapahtuma/'+id, data, {
             headers: { "Authorization": `Bearer ${token}` } 
         })
             .then(res => {
                 console.log(data)
                 setName('');
                 setPvm('');
                 setMaara('');
                 setO2Maara('');
                 setHMaara('');
                 setAMaara('');
                 setLoading(false);
                 window.location.reload();
                 //return navigate("/tapahtumalist");
             }).catch(err => {
                 setLoading(false);
                 setIsError(true);
             });
     }



     const handleDeleteVarmistus = () => {
        setLoading(true);
        setIsError(false);
        let txt = "a"
        if (window.confirm("Poistetaanko tapahtuma?")) {
            handleDeleteSubmit()
          } else {
            window.location.reload();
          }                  
        
    }



     const handleDeleteSubmit = () => {
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
        axios.delete(apiURL + '/tapahtuma/'+id, {
            headers: { "Authorization": `Bearer ${token}` } 
        })
            .then(res => {
                console.log(data)
                setName('');
                setPvm('');
                setMaara('');
                setO2Maara('');
                setHMaara('');
                setAMaara('');
                setLoading(false);
                return navigate("/tapahtuma");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }







    return (
        <div className="container">
            <table border="1">
                <thead>
                    <tr>
                        <th>Nro</th><th>Nimi</th><th>Pvm</th><th>Os. määrä yht.</th><th>Os. määrä alle 29v.</th><th>Kesto h</th><th>Autettuja</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{tapahtuma_id}</td>
                            <td><input type="text" id="name" value={name} onChange={e => setName(e.target.value)} /></td>
                            <td><input type="text" id="pvm" value={pvm} onChange={e => setPvm(e.target.value)} /></td>
                            <td><input type="text" id="maara" value={maara} onChange={e => setMaara(e.target.value)} /></td>
                            <td><input type="text" id="o2maara" value={o2maara} onChange={e => setO2Maara(e.target.value)} /></td>
                            <td><input type="text" id="hmaara" value={hmaara} onChange={e => setHMaara(e.target.value)} /></td>
                            <td><input type="text" id="amaara" value={amaara} onChange={e => setAMaara(e.target.value)} /></td>
                            <td><button className='btn btn-warning' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                    
                </tbody>
            </table>
            <br></br><button className='btn btn-danger' onClick={handleDeleteVarmistus}  disabled={loading}>Poista</button>
        </div>
    )
}

export default SelectedTapahtuma;