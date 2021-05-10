import logo from "../images/title.png";
import { Link } from "react-router-dom";
//login div, title div,navbar div


export default function Header() {
    return(
        <div className="header">
           <div className="title">
               <img src={logo} alt="title" />
           </div>
           <div className="Navbar">
               <ul >
                   <li>
                       <Link to="/">Home 🏠</Link>
                   </li>
                   <li>
                       <Link to="/rankings">Rankings 🏆</Link>
                   </li>
                   <li>
                       <Link to="/search">Search 🔎</Link>
                   </li>
                   <li>
                        <Link to="/login">Login 🔐</Link>
                     </li>
               </ul>
           </div>
        </div>
    )
}
    