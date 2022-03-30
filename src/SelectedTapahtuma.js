import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedTapahtuma = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tapahtuma_id, setIdTapahtumaId] = useState('');
    const [tapahtuman_nimi, setTapahtumannimi] = useState('');
    const [tapahtuman_pvm, setTapahtumanpvm] = useState('');
    const [os_maara_yhteensa, setOsMaara] = useState('');
    const [os_maara_alle29, setOsMaara29] = useState('');
    const [kesto_tunteina, setKesto] = useState('');
    const [autettuja, setAutettuja] = useState('');
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
                setIdTapahtumaId(id);
                console.log(response.tapahtuman_nimi);
                setTapahtumannimi(response.tapahtuman_nimi);
                setTapahtumanpvm(response.tapahtuman_pvm);
                setOsMaara(response.os_maara_yhteensa);
                setOsMaara29(response.os_maara_alle29);
                setKesto(response.kesto_tunteina);
                setAutettuja(response.autettuja);
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
           tapahtuma_id: tapahtuma_id,
           tapahtuman_nimi: tapahtuman_nimi,
           tapahtuman_pvm: tapahtuman_pvm,
           os_maara_yhteensa: os_maara_yhteensa,
           os_maara_alle29: os_maara_alle29,
           kesto_tunteina: kesto_tunteina,
           autettuja: autettuja
        }
        axios.put(apiURL + '/tapahtuma/'+id, data, {
            headers: { "Authorization": `Bearer ${token}` } 
        })
            .then(res => {
                setTapahtumannimi('');
                setTapahtumanpvm('');
                setOsMaara('');
                setOsMaara29('');
                setKesto('');
                setAutettuja('');
                setLoading(false);
                return navigate("/tapahtumalist");
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
                        <th>id_book</th><th>name</th><th>author</th><th>isbn</th><th>Choose</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            {/* <td>{id_book}</td>
                            <td><input type="text" id="name" value={name} onChange={e => setName(e.target.value)} /></td>
                            <td><input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} /></td>
                            <td><input type="text" id="isbn" value={isbn} onChange={e => setIsbn(e.target.value)} /></td>
                            <td><button type="submit" onClick={handleSubmit}  disabled={loading}>Update</button></td> */}
                        </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default SelectedTapahtuma;