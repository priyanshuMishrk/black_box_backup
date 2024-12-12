// twilioClient.js

const twilio = require('twilio');

const accountSid = 'ACad524b451a4cf95e412f400be83ce0a4'; // Your Account SID from www.twilio.com/console
const authToken = '7b2314533892b79152fef4e5e0f9352e';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

/**
 * Send a message using Twilio
 * @param {string} to - The recipient's phone number
 * @param {string} body - The message content
 * @returns {Promise} - The result of the Twilio API call
 */
const sendMessage = (body) => {
  const from = '+17079796149'; // From a valid Twilio number
  return client.messages.create({ body, to : "+917011710495", from });
};

module.exports = sendMessage;
