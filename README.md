
![Grace Slothpper](https://grace-slothpper.herokuapp.com/img/sloth-md.gif)

# Slothpper: Harry Max Nes Mercedes

_Good things come w' sloths_

## Intro

Slothpper is an eCommerce application built by Team Sloth -- Nes Martinez, Harry Prevor, Maxwell Han and Mercedes Madanire -- at Fullstack Academy on March 2020.

Looking to mix up a backend with `express`/`sequelize` and a frontend with
`react`/`redux`? That's `Slothpper`!

Based on Bloilermaker by Fullstack.

## Setup

===How to Run===
First, install the latest versions of `node` and `npm` from [nodejs.org](https://www.nodejs.org).

Then, from a console, run:

```
git clone https://github.com/Team-Sloth/Grace-Slothpper
cd Grace-Slothpper
npm install
npm run seed
npm run start-dev
```

The webapp should now be accessible from http://localhost:8080/. To deploy to Heroku, sign up for a Heroku account and install [its client](https://devcenter.heroku.com/articles/heroku-cli), then run these commands at the top-level directory to set up an app:

```
heroku login
heroku create <app-name>
heroku addons:create heroku-postgresql:hobby-dev
npm run deploy
heroku run bash
(from the Heroku bash prompt) npm run seed
```

When you’re done, your project should be accessible from https://<app-name>.herokuapp.com!

To test admin functionality on a live site, `use admin user “murphy@email.com” with password “123”`
To test shopper user functionality on a live site, `use user “cody@email.com” with password “123”`

## Features

### Stripe Checkout:

- Grace Slothpper has a built-in Stripe Checkout feature. Users are able to purchase via credit card; authorization tokens are sent through Stripe’s API keys, to Slothpper’s Stripe Dashboard. Stripe Checkout is integrated with the Orders on our website: when a customer checkout through Stripe, orders are added to their history. This will be essential for merging Stripe’s Dashboard info with our database.

### Google Authentication:

- In addition to creating a local account via the Sign Up sheet, users are able to use their Google accounts to create a Grace Slothpper account. Once a user has created a new account through Google, functionality remains identical as creating a local account.

### Notifications:

- Grace Slothpper has toast notifications enabled throughout the site to enable a good user experience. For example, when a user has logged in, or logged out, a simple notification enhances the experience. Additionally, cart functionality has toast notifications enabled, for adding and removing products. Throughout the site, simple user-end alerts are enabled, such as whether a user already exists (when signing up), if a user has tried to purchase more items than the quantity allows, or if a user input the wrong password at login.

### Administrative Functionality:

- The ability to perform special actions as a shop owner are enabled through conditionally rendering admin components based on a user’s authorization.  Forms for adding new products, updating existing products, managing user cart items, and displays for viewing sales data are provided.  These views are additionally protected at the Route definition level using React and React-Router-Dom.

### Backend protections:

- User data security is addressed through the use of auth and custom middleware functions in Express routes.  Users can only access their own data while Admins can see all.  Special cases such as unregistered guests adding items to an order are also permitted.

### Inventory Management:

- The situation where users place orders where the items are not in stock are addressed on the backend.  Sequelize model methods enable easy query building to process requested item amounts against the actual stock and will prevent invalid orders from being placed.  In the case of valid order requests, the database updates the product quantity reflecting the amount remaining after a purchase is made.

### Current Product Display:

- Making use of an actively managed inventory, singular product pages render selection options that prevent users from adding more items than they should.  If items are not in stock, no items will show.

### Pagination and Filtering on Products:

- These features are enabled via utility methods defined in React components.  Query-String simplifies parsing the URL where product selection is specified.  Large numbers of products are handled through pagination where page navigation options are provided.

## Design

### UX/ UI and Design

- View the screens of the web app for the Slothpper eCommerce store. The requirements for the user stories are listed on Google Docs. The look and feel guide including colors and layout is designed on a Figma board. The styling and user experience is built with CSS, and Flexbox.
Javascript Libraries, Slothpper is built with multiple Javascript libraries: SweetAlert, Moment, QueryString, and Material-UI.

### SweetAlert

- We use SweetAlert for toast messages. Toasts provide simple feedback about user operations in a small popup for the current activity to remain visible and interactive.

### Moment

-  The dates are displayed beautifully with momentjs

### QueryString

- The pagination is built with querystring module for parsing and formatting URL query strings.

### Material-UI

- We plan to build out new interaction patterns with Material-UI, a popular React UI framework to unify React and Material Design.

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

Boilermaker comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." However, everyone has
their own style, so we recommend that you and your team work out yours
and stick to it. Any linter rule that you object to can be "turned
off" in `.eslintrc.json`. You may also choose an entirely different
config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.
