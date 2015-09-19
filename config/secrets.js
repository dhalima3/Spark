module.exports = {

  db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  facebook: {
    clientID: process.env.FACEBOOK_ID || '1634407773470693',
    clientSecret: process.env.FACEBOOK_SECRET || 'cd469f6e7d257a0b6b4354958f48b2be',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  }
};
