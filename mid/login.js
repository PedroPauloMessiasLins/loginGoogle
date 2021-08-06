const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '797033371325-ke9if86o4o3t18lnbo9s96jhbbkmjli2.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


exports.puta= (res, req, next) => {
  

        let token = req.cookies['session-token'];
    
        let user = {};
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            user.name = payload.name;
            user.email = payload.email;
            user.picture = payload.picture;
          }
          verify()
          .then(()=>{
              req.user = user;
              next();
          })
          .catch(err=>{
              res.redirect('/login')
          })
    
    
}