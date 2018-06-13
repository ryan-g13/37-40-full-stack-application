import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profile';
import * as routes from '../../routes';

import autoBind from '../../utils';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editing: false };
    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render() {
    const { profile } = this.props;
    
    let editingJSX = null;
    let displayJSX = null;
    let profileJSX = null;

    if (profile) {
      editingJSX = 
      <div>
        <ProfileForm profile={profile} onComplete={this.handleUpdate} />
        <button onClick={() => this.setState({ editing: false })}> Cancel </button>
      </div>;
      displayJSX = 
      <div>
        <p>{profile.bio}</p>
        <button onClick={() => this.setState({ editing: true })}> Edit </button>
      </div>;
      profileJSX = 
      <div>
        <h2> {profile.username} </h2>
        <h3> {profile.email} </h3>
        {this.state.editing ? editingJSX : displayJSX} 
      </div>; 
    }
    return (
      <div>
        <h1>USER PROFILE</h1>
        {profile ? profileJSX : <ProfileForm onComplete={this.handleCreate}/>}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
  profileCreate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileActions.createProfileRequest(profile)),
  profileUpdate: profile => dispatch(profileActions.updateProfileRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
