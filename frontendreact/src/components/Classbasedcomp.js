import React from "react"
import { Component } from "react"

//es6 class based components
class Hellos extends React.Component {
    render() {
    return (
        <div>
        <h1>Hello {this.props.name}</h1>
        <button>click me</button>

</div>

    )



    }

}
export default Hellos



