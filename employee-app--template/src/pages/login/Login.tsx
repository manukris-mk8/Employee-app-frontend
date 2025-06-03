import { LeftContainer } from "../../containers/left-container/LeftContainer"
import { RightContainer } from "../../containers/right-container/RightContainer"
// import { UncontrolledLogin } from "../../containers/right-container/UncontrolledLogin"
import './Login.css'

const Login = () => {
    return(
        <div>
            <div className='outer-class'>
            <LeftContainer />
            <RightContainer />
            {/* <UncontrolledLogin/> */}
        </div>
        </div>
    )
}

export default Login;