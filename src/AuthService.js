import React, {useEffect, useState} from 'react';
import './App.css';

const AuthService = () => {
    const [token, setToken] = useState("");
    const username = 'user';
    const password = '1234';
    const url = 'http://localhost:8080/oauth/token';
    // Encoder les informations d'identification au format Base64
    const base64Credentials = btoa(`${username}:${password}`);
    // Configurer les options de la requête avec l'en-tête Authorization
    const requestOptions = {
        method: 'POST', // ou 'POST', 'PUT', etc. selon le type de requête que vous effectuez
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json', // ou tout autre en-tête requis
        },
        // Autres options si nécessaire
    };
    const getToken = () => {
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                setToken(data.accessToken)
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    }

    useEffect(() => {
        getToken()
        if( localStorage.getItem(token)===""){
            localStorage.setItem('token', token);
        }

    }, [token])

    return (
        <div></div>
    );
};

export default AuthService;
