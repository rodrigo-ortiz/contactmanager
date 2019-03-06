import React, { Component } from "react";
import { Consumer } from "../../context";
import uuid from 'uuid'
import TextInputGroup from "../layout/TextInputGroup";
class AddContact extends Component {
  state = {
    name  : "",
    email : "",
    phone : "",
    errors: {}

  };

  onSubmit = ( dispatch, e ) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Revisamos Errores
    if(name === ''){
      this.setState({
        errors : {name : 'Nombre es Requerido'}
      })
      return 
    }

    if(email === ''){
      this.setState({
        errors : {email : 'Correo Electronico es Requerido'}
      })

      return
    }

    if(phone === ''){
      this.setState({
        errors : {phone : 'Número Telefonico es Requerido'}
      })
      return
    }

    const newContact = {
      id : uuid(),
      name,
      email,
      phone 
    }

    dispatch({ type : 'ADD_CONTACT', payload : newContact})

    this.setState({
      name : '',
      email : '',
      phone : '',
    })


    this.props.history.push("/")
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value ;
          
          return (
            <article className="card mb-3">
              <header className="card-header">Agregar Contacto</header>

              <aside className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  
                  <TextInputGroup 
                    label={"Nombre"}
                    name={"name"}
                    value={name}
                    type={"text"}
                    placeholder={"Ingresa Nombre"}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup 
                    label={"Correo Electronico"}
                    name={"email"}
                    value={email}
                    type={"email"}
                    placeholder={"Ingresa Correo Electronico"}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup 
                    label={"Número Telefonico"}
                    name={"phone"}
                    value={phone}
                    type={"tel"}
                    placeholder={"Ingresa Número Telefonico"}
                    onChange={this.onChange}
                    error={errors.phone}

                  />


                  <input
                    type="submit"
                    value="Agregar Contacto"
                    className="btn btn-light btn-block"
                  />
                </form>
              </aside>
            </article>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
