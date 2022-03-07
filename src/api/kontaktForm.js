const { default: axios } = require('axios');

const handler = (req, res) => {
    return (
        axios
            .post('https://hook.eu1.make.com/kakat5kslb9nqkl7jf018x9170dbaoew', {
                mail: req.mail,
                message: req.message,
                name: req.name,
                phone: req.phone,
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
