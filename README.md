##Check Client
* Start freshly cloned application:

```
npm install
npm start
```

* Run with store logger enabled:

```
REACT_APP_DEV=true npm start
```

* Build for Production:

```
npm build
```

* Run tests:

```
npm test
```

* Run ESLint:

```
npm run lint
```

###Environment Variables

* `REACT_APP_REMOTE_URL: url string`

    Check server API url. Default: https://check-api-dev.silvervue.com.

* `REACT_APP_BUILD_NUMBER: string`
    
    Build number. Default: undefined.

* `REACT_APP_DEV: bool`
    
    Enables logging. Default: undefined.

###Tips
* Application uses `react-scripts` for build and configuration. Detailed User Guide is [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
* Test files are to be `<name>.test.js`.
* React-Router `Link` component is a router-aware anchor, if you need to link to an external site use an `<a>`.

###References
* [React Router API](https://reacttraining.com/react-router/web/guides/quick-start)
# transactionList
