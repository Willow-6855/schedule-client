import React from 'react'
import {use100vh} from 'react-div-100vh'

function News() {

    
    const vh = use100vh()
    return (
        <div style={{ height:vh-120, display: "flex", flexDirection:"row", width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <h1>Under construction!</h1>
        </div>
    )
}

export default News
