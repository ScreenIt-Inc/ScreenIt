import React from 'react';
import { connect } from 'react-redux';

export default function Settings(props) {
    return(
        <div className="container my-5">
            <p>Settings </p>
        </div>
    )   
}

// const mapStateToProps = (state) => {
//     return {
//         lang : state.lang
//     }
// }

// export default connect(mapStateToProps,null)(Home);