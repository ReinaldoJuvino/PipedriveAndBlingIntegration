const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opportunitySchema = new Schema(
    {
        title: String,
        value: Number,
        org_name: String,
        owner_name: String,
        won_time: String,
    }
);
// criando modelo baseado no schema criado
const opportunity = mongoose.model('opportunity', opportunitySchema);
module.exports = opportunity;
