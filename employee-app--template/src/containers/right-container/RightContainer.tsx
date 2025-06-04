// import './RightContainer.css'
// import kvLogo from '../../assets/kv-logo.png'
// import { Input, Button } from '../../components/index'
// import { useState, useEffect, useRef } from 'react'
// import { useLocalStorageHook } from '../../hooks/useLocalStorageHook'
// import { useNavigate } from 'react-router-dom'
// import { useLoginMutation } from '../../api-services/auth/login.api'
// // import LoadingComponent from '../../components/loadingComponent/LoadingComponent'

// export const RightContainer = () => {

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('');

//   const [showPassword, setShowPassword] = useLocalStorageHook("isShowPassword", "false");

//   const [login, { isLoading }] = useLoginMutation();

//   const navigate = useNavigate();

//   const usernameRef = useRef<HTMLInputElement>(null)

//   const handleUserAdornment = () => {
//     setUsername('');
//   }

//   const handlePasswordAdornment = () => {
//     setPassword('');
//   }


//   const onLogin = async () => {
//     login({ email: username, password: password })
//       .unwrap()
//       .then((response) => {
//         const token = JSON.stringify(response.data.accessToken)
//         localStorage.setItem("token", token)

//         navigate('/employees');
//       }).catch((error) => {
//         setError(error.data.message)
//       })
//   }

//   useEffect(() => {
//     usernameRef.current?.focus();
//   }, [])

//   useEffect(() => {
//     if (username.length > 0 && !username.includes('@')) {
//       setMessage("Invalid email id !")
//     }
//     return (() => {
//       setMessage('')
//     })
//   }, [username])

//   const handleChecked = () => {
//     if (showPassword === "true") {
//       setShowPassword("false")
//     }
//     else {
//       setShowPassword("true")
//     }
//   }



//   const handleLogin = (e: Event) => {
//     e.preventDefault()
//     onLogin();

//   }

//   // if (isLoading) return <LoadingComponent />;


//   return (
//     <div className='right-outer-class'>
//       <form className='login-form' onSubmit={(e: any) => handleLogin(e)}>
//         <img src={kvLogo} alt="kv-logo" />
//         <Input id='username' className='input-container' type="text" label='email' placeholder=' ' value={username} onChange={(event) => setUsername(event.target.value)} message={message} inputRef={usernameRef} endAdornment={<Button text={"X"} disabled={username.length === 0} className='cancel-btn' type='button' onClick={handleUserAdornment} />} />
//         <Input id='password' className='input-container' type={JSON.parse(showPassword) ? "text" : 'password'} label='password' placeholder=' ' value={password} onChange={(event) => setPassword(event.target.value)} endAdornment={<Button text={"X"} disabled={password.length === 0} className='cancel-btn' type='button' onClick={handlePasswordAdornment} />} />
//         <div className="checkbox-container">
//           <input
//             type="checkbox"
//             checked={JSON.parse(showPassword)}
//             onChange={handleChecked}
//             id="showPassword"
//           />
//           <label htmlFor="showPassword">Show password</label>
//         </div>

//         <Button disabled={isLoading} text="Log in" className='button-class' type='submit' />
//         {error &&
//           <p style={{ marginTop: "10px", color: "red" }}>Error: {error}</p>
//         }

//       </form>
//     </div>
//   )
// }