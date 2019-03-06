import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = (id, dispatch) => {
    //this.props.deleteClickHandler();
    //console.log('Click', id, dispatch)
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => dispatch({type : 'DELETE_CONTACT', payload : id}))
  };

  onShowClick = e => {
    const { showContactInfo } = this.state;
    console.log(" Click");
    this.setState({ showContactInfo: !showContactInfo });
  };

  render() {
    const { info } = this.props;
    const { name, phone, email, id } = info;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value 
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  style={{ cursor: "pointer" }}
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                />
                <i
                  className="fas fa-times"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                />

                <Link to={`contact/edit/${id}`} >
                  <i 
                    className="fas fa-pencil-alt" 
                    style={{
                        float   : 'right', 
                        cursor  : 'pointer',
                        color   : '#000',
                        marginRight : '1em'
                      }}
                    ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email : {email}</li>
                  <li className="list-group-item">Telefono : {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  info: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;
