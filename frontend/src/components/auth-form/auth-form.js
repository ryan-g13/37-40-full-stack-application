import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import autoBind from './../../utils';

const defaultState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is a Required Field',

  password: '',
  passwordDirty: false,
  passwordError: 'Password is a Required Field',
  
  email: '',
  emailDirty: false,
  emailError: 'Email is a Required Field',
};

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 4;
const MAX_USERNAME_LENGTH = 32;
const MAX_PASSWORD_LENGTH = 16;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, AuthForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value), 
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;
    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    } else {
      this.setState({
        usernameDirty: true,
        passwordDirty: true,
        emailDirty: true,
      });
    }
  }

  handleValidation(name, value) {
    if (this.props.type === 'login') {
      return null;
    }
    switch (name) {
      case 'username':
        if (value.length < MIN_USERNAME_LENGTH) {
          return `Your username must be ${MIN_USERNAME_LENGTH} characters in length.`;
        }
        if (value.length > MAX_USERNAME_LENGTH) {
          return `Your username must be less than ${MAX_USERNAME_LENGTH} characters in length.`;
        }
        return null;
      
      case 'password': 
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be ${MIN_PASSWORD_LENGTH} characters in length.`;
        }
        if (value.length > MAX_PASSWORD_LENGTH) {
          return `Your password must be less than ${MAX_PASSWORD_LENGTH} characters in length.`;
        }
        if (!/(?=[a-z])/.test(value)) {
          return 'Your password must contain a lowercase letter.';
        } 
        if (!/(?=[A-Z])/.test(value)) {
          return 'Your password must contain an Uppercase letter.';
        }
        if (!/(?=\d)/.test(value)) {
          return 'Your password must contain a numerical digit.';
        }
        if (!/(?=\W)/.test(value)) {
          return 'Your password must contain a special character !@#$%^&*().';
        }
        return null;

      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid Email';
        }
        return null;

      default: 
        return null;
    }
  }

  render() {
    let { type } = this.props;
    type = type === 'login' ? type : 'signup';
    
    const signupJSX = 
      <div>
        { this.state.emailDirty ? <p> {this.state.emailError }</p> : undefined }
      <input 
        name='email'
        placeholder='Enter Email Here'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />
      </div>;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='authForm' onSubmit={this.handleSubmit}>
        { this.state.usernameDirty ? <p>{ this.usernameError }</p> : undefined }
        <input 
          name='username'
          placeholder='Enter Username Here'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />

        { this.state.passwordDirty ? <p>{ this.state.passwordError }</p> : undefined }
        <input
          className={ this.state.passwordDirty ? 'input-error' : '' }
          name='password'
          placeholder='Enter Password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        {signupRenderedJSX}

        <button type='submit'> {type} </button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
