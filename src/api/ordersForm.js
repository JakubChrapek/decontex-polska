const { default: axios } = require('axios');

const handler = (req, res) => {
  return (
    axios
      .post('https://hook.eu1.make.com/3s9qhhjaknxgr7lyxvd4l375h4urmg8u', {
        name: req.name,
        mail: req.mail,
        phone: req.phone,
        title: req.title,
        adress: req.adress,
        postCode: req.postCode,
        message: req.message,
      })
      .then((res) => {
        return res
      })
      .catch((error) => {
        return error
      })
  )
}

module.exports = handler
