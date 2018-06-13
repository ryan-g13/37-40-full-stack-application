const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('Profile DNE.');
  }
  const { 
    username, user, bio, crawls, 
  } = profile;
  
  if (!username || !user || bio || !crawls) {
    throw new Error('Invalid Profile');
  } // probably going to error here
  return undefined;
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
