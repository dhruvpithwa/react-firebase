import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login, checkAuth } from "../../store/index"


const Login = () => {

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const passwordHandler = (event) => setPassword(event.target.value)
    const mobileHandler = (event) => setMobile(event.target.value)
    const message = useSelector((state) => state.message)
    

    useEffect(()=>{
        if(message == 'Success')
        {   
            const token = localStorage?.getItem("getUserAuthToken") ?? ''
            dispatch(checkAuth({'token':token}))   
        }

    }, [message])

    const submitHandler = (event) => {
        event.preventDefault();

        dispatch(login({
            'mobile': mobile,
            'password': password
        }))
    }

    return (

        <div class="container-fluid" id="login">

            <br />

            <div class="subheader-text">
                Login
            </div>

            <br /><br />

            <form class="col-sm-4 p-4 div-border">
                { message != '' && <div class="text-danger text-center">{message}</div> }
                <br></br>
                
                <div class="form-group">
                    <label for="inputMobile">Mobile Number</label>
                    <input type="text" class="form-control" id="inputMobile" placeholder="Enter mobile number" onChange={mobileHandler} value={mobile} />
                </div>

                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Enter password" onChange={passwordHandler} value={password} />
                </div>

                <button type="submit" class="btn btn-primary" onClick={submitHandler}>Submit</button>

                <br></br>
            </form>

        </div>

    )
}

export default Login;
