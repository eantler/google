import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uuid: { type: 'String', required: true},
  name: {
    givenName: { type: 'String', required: false },
    familyName: { type: 'String', required: false }
  },
  displayName: { type: 'String', required: false },
  email: { type: 'String', required: false },
  picture: { type: 'String', required: false },
  googleId: { type: 'String', required: true},
  dateAdded: { type: 'Date', default: Date.now, required: true },
  domain: {type: 'String', required: false},
});

export default mongoose.model('User', userSchema);

//id
  //  name
  //  displayName
  //  birthday
  //  relationship
  //  isPerson
  //  isPlusUser
  //  placesLived
  //  language
  //  emails
  //  gender
  //  picture
