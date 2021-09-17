/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';


export const NotFound = () => (
  <div>
    <h2>404: Page not found</h2>
    <h3>We couldn't find that page. You may have an incorrect URL or the system may need to fix redirects.</h3>
  </div>
);

export default NotFound;
