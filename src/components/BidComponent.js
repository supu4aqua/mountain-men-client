import React from 'react';
import Form from 'redux-form/lib/Form';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

export function BidComponent(props) {

  return (
    <div id='bid-component'>
        <span id='user-name'>{props.name}</span>
        <p id='post-desc'>this.state.post.desc</p>
        <img src='this.state.post.name' alt='post pic'></img>
        {/* <Form>
        <label>Your Offer:</label>
              <Field
                name='bid'
                component='input'
                type='number'
                placeholder='$25.00'
              />
              <button type='submit'>Submit Bid</button>
        </Form> */}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.currentUser !== null,
    anything: state,
  }
}

export default connect(mapStateToProps)(BidComponent);