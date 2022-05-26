import { useSelector, useDispatch } from "react-redux";
import { register } from "../../store/index"
import React, { useState } from "react";


const Register = () => {

    const dispatch = useDispatch();
    const registerMessage = useSelector((state) => state.registerMessage)

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');


    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const mobileHandler = (event) => {
        setMobile(event.target.value)
    }


    const submitHandler = (event) => {
        event.preventDefault();

        dispatch(register({
            'mobile': mobile,
            'fullName': name
        }))
    }

    return (

        <div class="container-fluid" id="register">

            <br />

            <div class="subheader-text">
                Register
            </div>

            <br /><br />

            <form class="col-sm-4 p-4 div-border">
                { registerMessage != '' && <div class="text-danger text-center">{registerMessage}</div> }
                <br></br>
                
                <div class="form-group">
                    <label for="inputFullName">Full Name</label>
                    <input type="text" class="form-control" id="inputFullName" placeholder="Enter full name" onChange={nameHandler} value={name} />
                </div>
                
                <div class="form-group">
                    <label for="inputMobile">Mobile Number</label>
                    <input type="text" class="form-control" id="inputMobile" placeholder="Enter mobile number" onChange={mobileHandler} value={mobile} />
                </div>

                <button type="submit" class="btn btn-primary" onClick={submitHandler}>Regsiter</button>

                <br></br>
            </form>

        </div>

    )
}

export default Register;
