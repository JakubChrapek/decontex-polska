const { default: axios } = require('axios');

const handler = (req) => {
  axios
    .post('https://hook.eu1.make.com/kakat5kslb9nqkl7jf018x9170dbaoew', {
      mail: req.mail,
      message: req.message,
      name: req.name,
      phone: req.phone,
    })
    .then((res) => {
      console.log(res);
    });
};

module.exports = handler;
