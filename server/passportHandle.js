import User from './models/user';
import cuid from 'cuid';

//set up google Authentication
export function handleGoogleStrategy(accessToken, refreshToken, profile, done) {

       let user = User.findOne({ googleId: profile.id }, function (err, user) {
         if (err) {
          console.log('Error finding user in db:' +err);
          return done(err);
       }

       if (!user) {
         user = new User({
           uuid: cuid(),
           displayName: profile.displayName,
           googleId: profile.id,
           name: profile.name,
           emails: profile.emails[0].value,
           picture: profile.photos[0].value,
           domain: profile._json.domain,
         });
         user.save(function (err) {
           return done(err,user);
         });
       } else {
         return done(err,user);
       }
   });
}

// how to serialize user
export function serializeUser(user, done) {
  done(null, user.uuid);
};

export function deserializeUser(id, done) {
  User.find({uuid: id }, function(err, user) {
    done(err, user);
  });
};


// Example of profile
// {
//   "id": "112025948878787948856",
//   "displayName": "Eitan Antler",
//   "name": {
//     "familyName": "Antler",
//     "givenName": "Eitan"
//   },
//   "emails": [
//     {
//       "value": "eitanan@wix.com",
//       "type": "account"
//     }
//   ],
//   "photos": [
//     {
//       "value": "https://lh3.googleusercontent.com/-JMbH20fcSyk/AAAAAAAAAAI/AAAAAAAAAA0/Or87d7r4RUw/photo.jpg?sz=50"
//     }
//   ],
//   "provider": "google",
//   "_raw": "{\n \"kind\": \"plus#person\",\n \"etag\": \"\\\"Sh4n9u6EtD24TM0RmWv7jTXojqc/8U0qp0v9rGecxgb9J0aDdsuDT9I\\\"\",\n \"emails\": [\n  {\n   \"value\": \"eitanan@wix.com\",\n   \"type\": \"account\"\n  }\n ],\n \"objectType\": \"person\",\n \"id\": \"112025948878787948856\",\n \"displayName\": \"Eitan Antler\",\n \"name\": {\n  \"familyName\": \"Antler\",\n  \"givenName\": \"Eitan\"\n },\n \"image\": {\n  \"url\": \"https://lh3.googleusercontent.com/-JMbH20fcSyk/AAAAAAAAAAI/AAAAAAAAAA0/Or87d7r4RUw/photo.jpg?sz=50\",\n  \"isDefault\": false\n },\n \"isPlusUser\": false,\n \"language\": \"en\",\n \"verified\": false,\n \"domain\": \"wix.com\"\n}\n",
//   "_json": {
//     "kind": "plus#person",
//     "etag": "\"Sh4n9u6EtD24TM0RmWv7jTXojqc/8U0qp0v9rGecxgb9J0aDdsuDT9I\"",
//     "emails": [
//       {
//         "value": "eitanan@wix.com",
//         "type": "account"
//       }
//     ],
//     "objectType": "person",
//     "id": "112025948878787948856",
//     "displayName": "Eitan Antler",
//     "name": {
//       "familyName": "Antler",
//       "givenName": "Eitan"
//     },
//     "image": {
//       "url": "https://lh3.googleusercontent.com/-JMbH20fcSyk/AAAAAAAAAAI/AAAAAAAAAA0/Or87d7r4RUw/photo.jpg?sz=50",
//       "isDefault": false
//     },
//     "isPlusUser": false,
//     "language": "en",
//     "verified": false,
//     "domain": "wix.com"
//   }
// }
