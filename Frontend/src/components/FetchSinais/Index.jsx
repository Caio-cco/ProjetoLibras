import { useState, useEffect } from "react";

export default function useFetch(url, token) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res  = await fetch(url, {
                    headers: { "x-access-token": token},
                });

                if (!res.ok) throw new Error(`Erro ao buscar dados de ${url}`);

                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error(err.message);
            } 
        };

        fetchData();
    }, [url, token]);

    return { data };
}