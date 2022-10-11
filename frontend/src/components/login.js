import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//css
import './login.css'


const Login = props => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const onChangeName = e => {
        const name = e.target.value
        setName(name);
    }
    const onChangeId = e => {
        const id = e.target.value
        setId(id)
    }
    const login = () => {
        props.login({
            name: name,
            id: id
        })

        navigate('/movies')
    }




    return (
        <div className="wrapper">
            <div className="loginBox">
                <form>
                    <label htmlFor="username"></label>
                    <input
                        id="username"
                        type="text"
                        value={name}
                        onChange={onChangeName}
                        placeholder="Enter username"
                    />

                    <label htmlFor='id'></label>


                    <input
                        id="id"
                        type="text"
                        value={id}
                        placeholder="Enter id"
                        onChange={onChangeId}
                    />
                    <button type="submit" onClick={login}>Login</button>
                </form>
            </div>

        </div>
    );
}

export default Login;