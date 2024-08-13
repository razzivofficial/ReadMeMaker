// Function to encode the email to base64
export function encodeEmail(email) {
    if (typeof email !== 'string') {
    //   console.error(`encodeEmail expects a string but received ${typeof email}`);
      return null; // Return null or handle it as per your need
    }
    return btoa(unescape(encodeURIComponent(email)));
  }
  
  // Function to decode the email from base64
  export function decodeEmail(encodedEmail) {
    if (typeof encodedEmail !== 'string') {
    //   console.error(`decodeEmail expects a string but received ${typeof encodedEmail}`);
      return null; // Return null or handle it as per your need
    }
    return decodeURIComponent(escape(atob(encodedEmail)));
  }
  