interface props {
    text: string
    className: string
    type: "submit"|"reset"|"button"
    disabled?: boolean
    onClick?: () => void
    imageIcon?: string
}

import './Button.css'


export const SpecialButton = (props: props) => {
    
    return (
        <button className={"create-emp-btn"} type={props.type} disabled={props.disabled} onClick={props.onClick}>
                <span className="circle-icon">{props.imageIcon?
                <img width={20} height={20} src={props.imageIcon} alt="edit"/>:"+"}</span>
            {props.text} 
            </button>
    ) 
    
}