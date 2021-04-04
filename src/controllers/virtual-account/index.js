const { default: axios } = require("axios");
const { REQUIRED_VALUE_EMPTY } = require("../../helpers/error");
const { xenditHeaders } = require("../../helpers/headers");

exports.createVirtualAccount = (req, res) => {
    const { name, bank_code, external_id } = req.body;
    if (!name) {
        REQUIRED_VALUE_EMPTY.error_at = 'field name';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!bank_code) {
        REQUIRED_VALUE_EMPTY.error_at = 'field bank_code';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error_at = 'field external_id';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    const payload = {
        name: name,
        bank_code: bank_code,
        external_id: external_id
    }
    axios({
        method: 'POST',
        url: 'https://api.xendit.co/callback_virtual_accounts',
        headers: xenditHeaders,
        data: JSON.stringify(payload)
    }).then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log(err);
        return res.send(err);
    })
}

exports.getVirtualAccount = (req, res) => {
    const { id } = req.params;
    if (!id) {
        REQUIRED_VALUE_EMPTY.error = 'id not found';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    axios({
        method: 'GET',
        url: 'https://api.xendit.co/callback_virtual_accounts/' + id,
        headers: xenditHeaders,
    }).then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log(err);
        return res.send(err);
    })
}