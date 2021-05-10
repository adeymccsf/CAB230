import exclamation from "../images/exclamation.png"
import { Login } from "./login.js"




export default function Home() {
    return(
        <div className="Home">
            <div className="Box">
                <img src={exclamation} alt="title" />
                    <span>Hi there! And welcome to the Happiness Data Index Application!
                    Before going any further we recommend that you create an account
                    or login to avoid missing out on our more premium features 😊</span>
            </div>
        <div className="LoginHome">
        <Login/>
    </div>
    </div>
    )
}
