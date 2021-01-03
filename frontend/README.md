Boilerplate Explanation [here](https://medium.com/better-programming/react-redux-saga-boilerplate-d2ca0c891ccd).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<h1>React boilerplate with redux</h1>
<h2>Description</h2>
<p>To make our projects we almost all the times it’s the create-react-app that we use to create an app with no build configuration. Or we just make our own simple boilerplate from scratch.</p>
<h2>Installation</h2>
<ol>
  <li>First, let's clone React-boilerplate-redux repository then you need to install the dependencies:</li>
  <code>npm install</code>
  <li>Now you can run the project:</li>
  <code>npm start</code>
  <li>Open localhost:3000 to see it in action.</li>
</ol>
<h2>Structure</h2>
<h4>🗃Assets</h4>
<ul>
  <li>Here you can put your assets like (images, fonts, icons, ...etc).</li>
</ul>
<hr>
<h4>🗃Components</h4>
<ul>
  <li>Here you will be able to develop you reusable components like (button, input, card, ...etc).</li>
  <li>Components will be functional and to deal with state here try to use React hooks (useState, useEffect, ...etc).</li>
  <li>Each component folder will contain javascript file & style file (css || sass || ...etc).</li>
</ul>
<hr>
<h4>🗃Containers</h4>
<ul>
  <li>These folders will represent your pages or containers which should contain your components.</li>
  <li>Containers will be class components.</li>
</ul>
<hr>
<h4>🗃Network</h4>
<ul>
  <li>That contain two folders 
    <ol>
      <li><strong>API:</strong> put your apis methodes there.</li>
      <li><strong>Interceptors:</strong> to handle each request || response || errors from apis</li>
    </ol>
  </li>
</ul>
<hr>
<h4>🗃Routes</h4>
<ul>
  <li>Wrap your app routes in Routes.js file.</li>
  <li>You will find History.js file that observes your journey of paths inside the app.</li>
</ul>
<hr>
<h4>🗃SCSS</h4>
<ul>
  <li>Here you could put your general styles (general || variables || mixins ...etc).</li>
</ul>
<hr>
<h4>🗃Store</h4>
<ul>
  <li><strong>Actions: </strong>Here you will put your actions to set any data to Redux store.</li>
  <li><strong>Reducers: </strong>Here you will put your Reducers to define how your data will be display in Redux store.</li>
  <li><strong>Sagas: </strong>Here you will create your saga's functions (generator functions) to call your APIS.</li>
  <li><strong>Types: </strong>Here you will define your types to use it inside the actions and reducers.</li>
  <li><strong>index: </strong>This file will wrap your Redux store main configurations (applyMiddleware || compose ...etc).</li>
</ul>
<hr>
<h4>🗃Utils</h4>
<ul>
  <li>Here you could put your constants like (base image URL) and your lazy-loaded components imports or any other helpers files.</li>
</ul>
<hr>
<h4>🗃index.js</h4>
<ul>
  <li>This file is bootstrap your application.</li>
</ul>
<hr>
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify