import './RightContainer.css'
import kvLogo from '../../assets/kv-logo.png'
import { Input, Button } from '../../components/index'
import { useEffect, useRef } from 'react'

export const UncontrolledLogin = () => {

  const usernameRef = useRef<HTMLInputElement>(null)
  const clearButonRef = useRef<HTMLButtonElement>(null)


  useEffect(() => {
      usernameRef.current?.focus();
    },[])

    const handleUserAdornment = () => {
        if (usernameRef.current){
            return usernameRef.current.value =''
        }
        if(clearButonRef.current){
            return clearButonRef.current.disabled=true
        }
    }



    const updateClearButton = () => {
        if(usernameRef.current){
            if(usernameRef.current.value.length > 0){
                if(clearButonRef.current){
                    clearButonRef.current.disabled=false
                    clearButonRef.current.onclick = handleUserAdornment
                }
            }
            else{
                if(clearButonRef.current) {
                    clearButonRef.current.disabled =true
                }
            }
        }
    }


   
    // const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {

    // }

    return (
        <div className='right-outer-class'>
      <form className='login-form'>
        <img src={kvLogo} alt="kv-logo" />
    <Input id='username' className='input-container' type="text" label='username' onChange={updateClearButton} placeholder=' ' inputRef={usernameRef} endAdornment={<Button text={"X"} className='cancel-btn' clearRef={clearButonRef} type='button' disabled={true} onClick={handleUserAdornment}/>}/>
    <Input id='password' className='input-container' type='password' label='password' placeholder=' '/>
    <Button text={"login"} className='button-class' type='submit' onClick={()=>{}}/>
{/* 
      <p>username:{username}</p>
      <p>password:{password}</p>
      <p>X: {mousePointer.x}</p>
      <p>Y: {mousePointer.y}</p> */}


  </form>
  </div>
    )
}