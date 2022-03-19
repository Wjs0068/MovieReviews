import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Movies from "./Movies.js";

const PrivateRouteCreate = () => (
  <div>
    <Movies />
  </div>
);

export default withAuthenticationRequired(PrivateRouteCreate, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (
    <div className="loading-container">
      <p className="loading">Loading...</p>
    </div>
  ),
});
