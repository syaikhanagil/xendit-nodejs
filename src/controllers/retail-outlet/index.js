const { default: axios } = require("axios");
const { REQUIRED_VALUE_EMPTY } = require("../../helpers/error");
const { xenditHeaders } = require("../../helpers/headers");

exports.createRetailPayment = (req, res) => {
    const {name, retail_outlet_name, external_id, expected_amount} = req.body;
    if (!name) {
        REQUIRED_VALUE_EMPTY.error_at = 'field name';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!retail_outlet_name) {
        REQUIRED_VALUE_EMPTY.error_at = 'field retail_outlet_name';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error_at = 'field external_id';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!expected_amount) {
        REQUIRED_VALUE_EMPTY.error_at = 'field expected_amount';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    const payload = {
        name: name, 
        retail_outlet_name: retail_outlet_name,
        external_id: external_id,
        expected_amount: expected_amount
    }
    axios({
        method: 'POST',
        url: 'https://api.xendit.co/fixed_payment_code',
        headers: xenditHeaders,
        data: JSON.stringify(payload)
    }).then(response => {
        return res.send(response.data);
    }).catch(err => {
        return res.send(err);
    })
}

exports.getRetailPayment = (req, res) => {
    const {id} = req.params;
    if (!id) {
        REQUIRED_VALUE_EMPTY.error = 'id not found';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    axios({
        method: 'GET',
        url: 'https://api.xendit.co/fixed_payment_code/'+id,
        headers: xenditHeaders
    }).then(response => {
        return res.send(response.data);
    }).catch(err => {
        console.log(err);
        return res.send(err);
    })
}