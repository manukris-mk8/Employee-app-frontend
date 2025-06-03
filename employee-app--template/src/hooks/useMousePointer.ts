import { useEffect, useState } from "react"

const useMousePointer = () => {
    const [mousePointer,setMousePointer] = useState({x:0,y:0});

    useEffect (() => {
        const handleMouseMove = (event:MouseEvent) => {
        setMousePointer({
            x:event.clientX,
            y:event.clientY
     } )
    }
    window.addEventListener('mousemove',handleMouseMove)

    return (() => {
        window.removeEventListener("mousemove",handleMouseMove)
    })
    },[])
    
    

    return [mousePointer];

}

export default useMousePointer;