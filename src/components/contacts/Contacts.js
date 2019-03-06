import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from '../../context'

class Contacts extends Component {

  deleteContact = (id) =>{
      const { contacts } = this.state;

      const newContacts = contacts.filter(contact => contact.id !== id);

      this.setState({
          contacts : newContacts
      })
      //console.log(' Contacts ', newContacts)
  }

  render() {
      return (
          <Consumer>
              {value => {
                  const { contacts } = value;
                  console.log(' Value ', value );
                  return (
                    
                    <React.Fragment>
                        <h1 className="display-4 mb-2" >Lista de Contactos</h1>
                    {contacts.map((c,i) =>{
                        return <Contact 
                            key={c.id} 
                            info={c} 
                            deleteClickHandler={this.deleteContact.bind(this, c.id)} />
                    })}
                    </React.Fragment>
                      
                  )
              }}
          </Consumer>
      )
    
  }
}

export default Contacts;
