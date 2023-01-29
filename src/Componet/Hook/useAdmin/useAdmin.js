import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    // const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://solutya-server1.herokuapp.com/admin/${email}`, {
                method: 'GET',
                // headers: {
                //     'content-type': 'application/json',
                //     authorization: `Bearer ${localStorage.getItem('accessTokenSecret')}`
                // }
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.admin);
                    console.log('adminnnnnnnn', data.admin)
                    // setAdminLoading(false);
                })
        }
    }, [user])

    return [admin]
}

export default useAdmin;