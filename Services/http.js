const axios = require('axios')

exports.get = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Auth-Token': 'cd5ddc70c0374407b4ab170dd5a2cc28'
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: "Request processing error",
      message: error
    }
  }
}