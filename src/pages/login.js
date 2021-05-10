import { useState , useEffect } from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";

export function Login(){

    const registerEnd = `/user/register`
    const loginEnd = `/user/login`

    // initialise state
    const [ userChoice, setUserChoice ] = useState("Register")      // user selected option
    const [ email, setEmail ] = useState([])        // user email
    const [ password, setPassword ] = useState([])      // user password
    const [ loggedIn, setLoggedIn ] = useState([])      // the login status
    const [ response, setResponse ] = useState([])      // the server repsonse

    // check if user logged in and jwt valid
    useEffect(() => {       
        fetch(`http://131.181.190.87:3000/factors/2020?country=Australia`,{
            method: "GET",
            headers: { accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then((res) => res.json())
        .then((res) => {
            if(!res.error){
                setLoggedIn(true)
                localStorage.setItem("login","1")
                setUserChoice("Logout")
                setResponse(`Logged in as ${localStorage.getItem("loginName")}`)
            } else {
                setLoggedIn(false)
                localStorage.setItem("login","0")
                setResponse("Logged out")
        }})
    },[]);

    // handle the login process
    const loginHandler = function() {
        if (userChoice === "Register"){
            return fetch(`http://131.181.190.87:3000${registerEnd}`,{
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email: `${email}`, password: `${password}`})
        })
        .then((res) => res.json())
        .then((res) => {
            setResponse(res.message)
        })
        } else if (userChoice === "Login"){
            return fetch(`http://131.181.190.87:3000${loginEnd}`,{
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({email: `${email}`, password: `${password}`})
            })
            .then((res) => res.json())
            .then((res) => {
                if (!res.error){
                    localStorage.setItem("loginName",email)
                    localStorage.setItem("token",res.token)
                    setLoggedIn(true)
                    setResponse(`Logged in as ${localStorage.getItem("loginName")}`)
                    setUserChoice("Logout")
                    localStorage.setItem("login","1")
                    return
                } else {
                    setResponse(res.message)
                    return
                }})
        } else if (userChoice === "Logout"){
            localStorage.setItem("login","0")
            localStorage.removeItem("token")
            localStorage.removeItem("loginName")
            setResponse("Logged out");
            setLoggedIn(false);
            setUserChoice("Register");
            return;
        }
    console.log(localStorage.getItem("login"))}

    return(
        <div className="LoginForm">
            <div className="HomeButton2">
                <DropdownButton title="Select an Option">
                    <Dropdown.Item onClick={() => setUserChoice("Register")} disabled={loggedIn}>Register</Dropdown.Item>
                    <Dropdown.Item onClick={() => setUserChoice("Login")} disabled={loggedIn}>Login</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="SearchBar">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loggedIn}
                    placeholder="username"
                    >
                </input>
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loggedIn}
                placeholder="password"
                >
            </input>
            </div>
            <div className="Submit">

            </div>
            <div className="Response">
                <p>{response}</p>
                <Button onClick={() => loginHandler()}>{userChoice}</Button>
            </div>
        </div>
    )}

