import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const abortCont = new AbortController();

    useEffect(() => {
        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if(!res.ok)
            { 
                throw Error('data not available');
            }
            return res.json()
        })
        .then((data) => { 
            setData(data);
            setIsPending(false);
         })
         .catch((err) => { 
             if(err.name !== 'AbortError')
             {
                 setError(err.message);
             }
            });
        
        return() => abortCont.abort();

    },[url]);
    
    return {data, isPending, error}
}

export default useFetch;