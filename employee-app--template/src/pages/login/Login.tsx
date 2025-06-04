import { useEffect, useRef, useState } from "react"
// import { LeftContainer } from "../../containers/left-container/LeftContainer"
// import { RightContainer } from "../../containers/right-container/RightContainer"
// import { UncontrolledLogin } from "../../containers/right-container/UncontrolledLogin"
import './Login.css'
import { useLocalStorageHook } from "../../hooks/useLocalStorageHook"
import { useLoginMutation } from "../../api-services/auth/login.api"
import { useNavigate } from "react-router-dom"
import loginImage from '../../assets/kv-login.jpeg'
import kvLogo from '../../assets/kv-logo.png'
import { Button, Input } from "../../components"
import LoadingComponent from "../../components/loadingComponent/LoadingComponent"
import { toast } from "react-toastify"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    // const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useLocalStorageHook("isShowPassword", "false");

    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null)

    const handleUserAdornment = () => {
        setUsername('');
    }

    const handlePasswordAdornment = () => {
        setPassword('');
    }


    const onLogin = async () => {
        login({ email: username, password: password })
            .unwrap()
            .then((response) => {
                const token = JSON.stringify(response.data.accessToken)
                localStorage.setItem("token", token)

                navigate('/employees');
            }).catch((error) => {
                toast(error.data.message,{type:'error'})
            })
    }

    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    useEffect(() => {
        if (username.length > 0 && !username.includes('@')) {
            setMessage("Invalid email id !")
        }
        return (() => {
            setMessage('')
        })
    }, [username])

    const handleChecked = () => {
        if (showPassword === "true") {
            setShowPassword("false")
        }
        else {
            setShowPassword("true")
        }
    }



    const handleLogin = (e: Event) => {
        e.preventDefault()
        onLogin();

    }

    if (isLoading) return <LoadingComponent />;


    return (
        <div>
            <div className='outer-class'>
                {/* <LeftContainer /> */}
                {/* <RightContainer /> */}
                {/* <UncontrolledLogin/> */}
                <div className='left-outer-class'>
                    <div className="circle">
                        <img src={loginImage} alt="kv-login" />
                    </div>

                </div>
                <div className='right-outer-class'>
                    <form className='login-form' onSubmit={(e: any) => handleLogin(e)}>
                        <img src={kvLogo} alt="kv-logo" />
                        <Input id='username' className='input-container' type="text" label='email' placeholder=' ' value={username} onChange={(event) => setUsername(event.target.value)} message={message} inputRef={usernameRef} endAdornment={<Button text={"X"} disabled={username.length === 0} className='cancel-btn' type='button' onClick={handleUserAdornment} />} />
                        <Input id='password' className='input-container' type={JSON.parse(showPassword) ? "text" : 'password'} label='password' placeholder=' ' value={password} onChange={(event) => setPassword(event.target.value)} endAdornment={<Button text={"X"} disabled={password.length === 0} className='cancel-btn' type='button' onClick={handlePasswordAdornment} />} />
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={JSON.parse(showPassword)}
                                onChange={handleChecked}
                                id="showPassword"
                            />
                            <label htmlFor="showPassword">Show password</label>
                        </div>

                        <Button disabled={isLoading} text="Log in" className='button-class' type='submit' />
                        {/* { error &&
                            <p style={{ marginTop: "10px", color: "red" }}>Error: {error}</p>
                        } */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;