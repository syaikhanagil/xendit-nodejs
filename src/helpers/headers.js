require('dotenv').config();

const generateToken = () => {
    const xendit_api_key = process.env.XENDIT_KEY+':';
    // Convert xendit api key to base64 string
    const base64 = new Buffer.from(xendit_api_key).toString('base64');
    return base64;
}
exports.xenditHeaders = {
    'Authorization': 'Basic '+generateToken(),
    'Content-Type': 'application/json'
}