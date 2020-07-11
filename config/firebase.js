const admin = require('firebase-admin')

//   // initial firebase
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FB_type,
    project_id: process.env.FB_project_id,
    private_key_id: process.env.FB_private_key_id,
    private_key: process.env.FB_private_key.replace(/\\n/g, '\n'),
    client_email: process.env.FB_client_email,
    client_id: process.env.FB_client_id,
    auth_uri: process.env.FB_auth_uri,
    token_uri: process.env.FB_token_uri,
    auth_provider_x509_cert_url: process.env.FB_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.FB_client_x509_cert_url
  }),
  databaseURL: 'https://apinode-31261.firebaseio.com'
})

module.exports = admin
