class SDKClient {
  constructor(flags,errorCondition) {
    this.flags = {};
    this.errorCondition = errorCondition
  }

  async flagAction(flagName, newCb [opt], oldCb [opt]) {
    try {
      let result;
      if (flags[flagName]) {
        result = await newCb();
      } else if (oldCb) {
        result = await oldCb();
      }
      this.emitSuccess();
    } catch (error) {
      this.emitError(error);
    }
  }

  emitSuccess() {}
  emitError(error) {}
}

function1(param)

let filledFunction1 = (param) => function1(param)
router.get('/', (req, res) => { // pass parameters without invoking the function
  flagAction('flag_1', func1, func2)
})


router.get('/path', async (req, res) => {
  if (flagEnabled.flagName) {
    try {
      const response = await someAsyncCall('param')

      SDK.emitSuccess('flag_name')
    } catch (err) {
      SDK.emitError('flag_name')
    }

  } else {

  }
})

// ///// Pioneer Interface:

const SDK = require("pioneer-javascript-sdk");

const scoutAddress = "http://localhost:3030";

const sdkKey = "JazzyElksRule";

const config = await new SDK(scoutAddress, sdkKey).connect().withWaitForData();
const sdkClient = config.client;

// gets the feature value
if (sdkClient.getFeature("LOGIN_MICROSERVICE") {
  // route the request to a microservice
} else {
  // call a monolith internal service
};

//// Unleash Interface:

// const unleash = require('unleash-client');

// unleash.initialize({
//   url: 'https://YOUR-API-URL',
//   appName: 'my-node-name',
//   environment: process.env.APP_ENV,
//   customHeaders: { Authorization: 'SOME-SECRET' },
// });

// if (unleash.isEnabled('DemoToggle')) {
//   console.log('Toggle enabled');
// } else {
//   console.log('Toggle disabled');
// }

//// LaunchDarkly Interface:

// const ld = require('launchdarkly-node-server-sdk');

// const client = ld.init('YOUR_SDK_KEY');

// client.once('ready', () => {
//   client.variation('YOUR_FLAG_KEY', user, false,
//     (err, showFeature) => {
//       if (showFeature) {
//         // application code to show the feature
//       } else {
//         // the code to run if the feature is off
//       }
//     });
// });


/// Breaker initialization:

// const breaker1 = new Circuit(axios.get)

// app.get('/', async (req, res) => {
//   breaker1.fire(apiURL)
//    .then(response => res.send(response.data))
//    .catch(error => {
//     res.send({message: error.message})
//   })
// }

//// Internal fire / emitting methods:

// async fire(...args) {
//   try {
//     const response = await this.func.apply(this, args)

//     if ( response.status === 200 || response.statusCode === 200 ) {
//       return this._success( response )
//     } else {
//       return this._failure( response )
//     }
//   } catch(err) {
//     return this._failure( err )
//   } 
// }

// async _success(response) {
//   await this.client.ts.add(`${this.flagName}_SUCCESS`, '*', 1);
//   this.successCount++
//   this._log('Successful Request')
//   return response
// }

// async _failure(err) {
//   await this.client.ts.add(`${this.flagName}_FAILURE`, '*', 1);
//   this.failureCount++
//   this._log('Failed Request')
//   throw Error(err)
// }