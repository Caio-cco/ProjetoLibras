import { useState, useEffect } from "react";

export default function useFetch(url, token) {
    const [data, setData] = useState(null);
    //const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //setLoading(true);
                const res  = await fetch(url, {
                    headers: { "x-access-token": token},
                });

                if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);

                const result = await res.json();
                setData(result);
            } catch (err) {
                //setError(err.message);
                console.error(err.message);
            } 
            // finally {
            //     setLoading(false);
            // }
        };

        fetchData();
    }, [url, token]);

    // return { data, error, loading };
    return { data };
}