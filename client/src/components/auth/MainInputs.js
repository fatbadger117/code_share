 import React from 'react';
import { Link } from "react-router-dom";
import './styles.css'
// import { connect } from "react-redux";
// import { clearAssignments } from "../redux/choresRedux.js";
// import { resetAssigned } from "../redux/peopleRedux.js";

function MainInputs(props) {
    const handleClick = () => {
        props.clearAssignments();
        props.resetAssigned();
    }
    return (
        <div className="homeWrapper">
            <header>Code_Share</header>
            <div className="linkWrapper">
                <Link className="homeLink people" to="/peopleInputs"></Link>
                <Link className="homeLink chores" to="/choresInputs"></Link>
                <Link className="homeLink assign" to="/assignedChores" onClick={handleClick}></Link>
            </div>
        </div>
    )
}
// const mapStateToProps = state => {
//     return state.chores
// }
export default MainInputs
