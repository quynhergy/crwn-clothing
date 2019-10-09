import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils.js';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''})
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='sign-in' onSubmit={this.handleSubmit}>
        <h2>I already have an account</h2>
        <p>Sign in with your email and password</p>
        <form onSubmit={this.handleChange}>
          <FormInput 
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput 
            name='password'
            type='password'
            handleChange={this.handleChange}
            value={this.state.password}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>     
        </form>
      </div> 
    )
  }
};

export default SignIn;