import './SelectComponent.css'

interface props{
    id: string,
    label?: string,
    placeholder: string,
    className: string,
    value?:string | number
    disabled? : boolean
    options : {
        value:string,
        label:string
    }[] | undefined,
    onChange ? :(event: React.ChangeEvent<HTMLSelectElement>) => void;

}
export const SelectComponent = (props:props) => {
    
    return (
        <div className={props.className}>
                <label htmlFor={props.id}>{props.label}</label>
                <select name={props.id} id={props.id} value={props.value} onChange={props.onChange} required={true} disabled={props.disabled}>
                    <option value="" disabled  hidden>
                            {props.label}
                        </option>
                    {props.options?.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
                </select>
                </div>
    ) 
    
}