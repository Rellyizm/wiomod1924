const ayarlar = require('../../Ayarlar.json')
const { connect, connection } = require("mongoose");

connect(ayarlar.Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false
});

