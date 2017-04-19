/************************************************************
- mup.js sets the config to use the mup meteor deployment tool 
- the .deploySampleVersion directory is for a separate instance on the same digitalOCean.com droplet - just runs on a different port

https://github.com/kadirahq/meteor-up
" Production Quality Meteor Deployments"

Meteor up is a command line tool that allows you to deploy any Meteor app to your own server. It currently supports Ubuntu.

You can install and use Meteor Up on Linux, Mac and Windows.

*************************************************************/

module.exports = {
  servers: {
    one: {
      host: '178.62.113.34',
      username: 'root',
      pem:  'C:/Users/Si/.ssh/DO.ppk'
      // password:
      // or leave blank for authenticate from ssh-agent
      // opts: {
      //     port: 8000,
      // }
    }
  },

  meteor: {
    name: 'nag-admin',
    path: '../',
    servers: {
      one: {}
    },
    env: {
      ROOT_URL: 'http://app.nag.org.za'
      , MONGO_URL: 'mongodb://127.0.0.1:27017/nag-admin'
      // , PORT: 8000
      // , MONGO_URL: 'mongodb://localhost/meteor'
    },

    deployCheckWaitTime: 60,
    // dockerImage: 'kadirahq/meteord'
    dockerImage: 'abernix/meteord:base'
  },

    // buildOptions: {
    //   serverOnly: true,
    //   buildLocation: 'D:\Simon\Temp\apps\builds', // defaults to /tmp/<uuid>
    //   cleanAfterBuild: false, // default
    //   debug: true
    // },
  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  }
};

