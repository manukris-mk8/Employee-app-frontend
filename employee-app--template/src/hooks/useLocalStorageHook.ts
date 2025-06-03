import { useEffect, useState } from "react"

export const useLocalStorageHook =(key:string,defaultVal:string ) : [string,(value:string) => void] => {
    const [data,setData] = useState(defaultVal);

    useEffect(() => {
        let value = localStorage.getItem(key);

        if(value){
            setData(value)
        }

    },[])

    const setToLocalStorage = (value:string) => {
        setData(value)
        localStorage.setItem(key,value)
    }

    return[data,setToLocalStorage]

}