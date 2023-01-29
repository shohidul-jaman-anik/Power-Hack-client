import React, { useEffect, useState } from 'react';


const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        console.log(email, "hahahahha")
        const currentUser = { email: email };
        if (email) {
            fetch(`https://solutya-server1.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('data inside useToken', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessTokenSecret', accessToken);
                    setToken(accessToken);
                })
        }

    }, [user]);
    return [token];
}

export default useToken;

