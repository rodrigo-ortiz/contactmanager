import React, { Component } from "react";
import axios from 'axios'

const ContactContext = React.createContext();
const reducer = (state, action) =>{
    //console.log(' Action ', action)
    switch(action.type){
        case 'DELETE_CONTACT' :
            return {
                ...state,
                contacts : state.contacts.filter(contact => contact.id !== action.payload)
            }
        case 'ADD_CONTACT' : 
            return {
              ...state ,
              contacts : [action.payload, ...state.contacts]
            }
        default:
            return state
    }
}

export class Provider extends Component {
  state = {
    contacts : [],
    dispatch : action => this.setState(state => reducer(state, action))
  }

  async componentDidMount(){
    const contacts = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      contacts : contacts.data
    })
    
  }


  render(){
      return(
        <ContactContext.Provider value={this.state}>
            {this.props.children}
        </ContactContext.Provider>
      )
  }
}

export  const Consumer = ContactContext.Consumer;
