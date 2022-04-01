import React, { Component } from 'react';

class MyClass extends Component {
    constructor(props){
        super(props);
        this.state={name:props.fname};
        this.setYear=this.setYear.bind(this);
        this.updateName=this.updateName.bind(this);
    }
    setName() {
        this.setState({name:"No name"});    
    }
    updateName = (event)=>{
        const userValue = event.target.value;
        this.setState({name:userValue}); 
        console.log(userValue);
    };

    render() {
        return (
            <div>
                <h2>MyClass</h2>
                <input  onChange={this.updateName}/>
                <p>Vuosi: {this.state.name}</p>
                <button onClick={this.setYear}>Set to NoName</button>
            </div>
        );
    }
}

export default MyClass;