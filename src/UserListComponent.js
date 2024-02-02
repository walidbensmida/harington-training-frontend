import React, {useEffect, useState} from 'react';
import './App.css';

const UserListComponent = () => {
    const [userList, setUserList] = useState([]);
    const token = localStorage.getItem('token');
    console.log('Token au début du composant:', token);

    const fetchList = async () => {
        const result = await fetch('http://localhost:8080/api/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const list = await result.json();
        setUserList(list)

    }

    useEffect(() => {
        if (token !== "") {
            fetchList()
        }
    }, [token])
    const sortedUserList = userList.slice().sort((a, b) => a.id - b.id);
    const renderedUsers = sortedUserList.map((user) => (
        <div>
            <p key={user.id}>{user.id}, {user.firstName}, {user.lastName}, {user.role}</p>
            <button onClick={() => deleteUser(user.id)}>Supprimer</button>
        </div>
    ));
    const deleteUser = async (userId) => {
        console.log("test")
        try {
            const result = await fetch(`http://localhost:8080/api/v1/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!result.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur');
            }

            console.log('Utilisateur supprimé avec succès');
            await fetchList()
        } catch (error) {
            console.error('Erreur:', error);
            // Ajoutez ici la logique pour gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur.
        }

    }
    return (
        <div>
            {renderedUsers}
        </div>
    );
};

export default UserListComponent;
