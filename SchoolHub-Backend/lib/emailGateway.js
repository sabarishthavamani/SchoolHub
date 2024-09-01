const twilio = require('twilio');

const sendSMS = async ({ to, message }) => {
    const accountSid = 'ACce769617397c9ecca63dd175ba87658f'; // Your Twilio account SID
    const authToken = '50176780b5f2215c57e54832ecb55a2a'; // Your Twilio auth token
    const client = twilio(accountSid, authToken);

    try {
        const smsResponse = await client.messages.create({
            body: message,
            to: to,
            from: '+18142472647', // Replace with your valid Twilio phone number
        });

        console.log(smsResponse.sid);
    } catch (err) {
        if (err.code === 21608) {
            console.log('The number is unverified. Trial accounts cannot send messages to unverified numbers.');
            return { error: 'The number is unverified. Please verify it or upgrade your Twilio account.' };
        } else {
            console.log('SMS ERROR:', err);
            throw err;
        }
    }
};

module.exports = sendSMS;
