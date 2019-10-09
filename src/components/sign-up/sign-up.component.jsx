import React from 'react';

import './sign-up.styles.css';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    const { displayName, email, password, confirmPassword } = this.state;
    
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, {displayName});

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = event => {
    const {value, name } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput 
            name='displayName'
            type='text'
            handleChange={this.handleChange}
            value={this.state.displayName}
            label="Display Name"
            required
          />
          <FormInput
            name='email'
            type='email'
            label='Email'
            handleChange={this.handleChange}
            value={this.state.email}
            required
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            handleChange={this.handleChange}
            value={this.state.password}
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign up</CustomButton>
          </div>    
        </form>
      </div>
    )
  }

}

export default SignUp;