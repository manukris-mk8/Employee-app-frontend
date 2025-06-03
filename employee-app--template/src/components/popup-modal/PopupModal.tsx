// import type { FormEventHandler } from 'react';
import { Button } from '../button/Button';
import './PopupModal.css'

interface props {
  mainText: string,
  subText: string,
  onClose : (()=>{})
  onSubmit? : any
}
export const PopupModal = (props: props) => {
  console.log(" called popup");
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className='texts'>
        <h2>{props.mainText}</h2>
        <p>{props.subText}</p>
        </div>
        <button className={"closeButton"} onClick={props.onClose}>X</button>
         <div className="buttons">
            <Button className="create-btn" type="button" text="Confirm" onClick={props.onSubmit}/>
            <Button className="reset-btn" type="button" text="Cancel" onClick={props.onClose}/>
        </div>
      </div>
    </div>
  );
}
