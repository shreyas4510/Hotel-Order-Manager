import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import User from "../../assets/images/user.png";
import { FaBell } from "react-icons/fa";
import "../../assets/styles/navbar.css";

function Navbars() {
    const notifications = 5;

    return (
        <Navbar className="py-1 navbar-container">
            <Nav className="ms-auto d-flex align-items-center">
                <div className='notification-bell'>
                    <div className='notification-text'>{ notifications }</div>
                    <FaBell color='white' size={25}/>
                </div>
                <NavDropdown key={1}
                    title={ <img className="p-1 bg-warning user-logo" src={User} alt="user pic" /> }
                    drop='down-start'
                    className="hide-dropdown-arrow mx-3 p-0"
                >
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}

export default Navbars;