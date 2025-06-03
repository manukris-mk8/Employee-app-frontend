import './Input.css'

interface props{
    id: string,
    label?: string,
    placeholder?: string,
    type?:string,
    className: string,
    value?: string | number,
    message ?: string,
    disabled?:boolean,
    required? :boolean,
    onChange  :(event: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef? : React.Ref<HTMLInputElement>;
    endAdornment?:React.ReactNode;
}
export const Input = (props:props) => {
    
    return (
        <div className={props.className}>
            {/* <div style={{display:'flex'}}> */}
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} disabled={props.disabled} className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} ref={props.inputRef} required={props.required ?? true} style={props.message ?{borderColor:"red"}:{} }/>
        {props.endAdornment?props.endAdornment:null}
        {/* </div> */}
        {
            props.message && (
                <div style={{color:"red", fontSize:"small"}}>
                    {props.message}
                </div>
            )
        }
        </div>
    ) 
    
}