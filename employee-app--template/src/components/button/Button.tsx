interface props {
    text: string
    className: string
    type: "submit"|"reset"|"button"
    disabled?: boolean
    onClick?: () => void
    clearRef? : React.Ref<HTMLButtonElement>;
    onSubmit? : FormEventHandler<HTMLButtonElement>
}

import type { FormEventHandler } from 'react'
import './Button.css'


export const Button = (props: props) => {
    
    return (
        <button className={props.className} type={props.type} disabled={props.disabled} onClick={props.onClick} ref={props.clearRef} onSubmit={props.onSubmit}>{props.text} </button>
    ) 
    
}