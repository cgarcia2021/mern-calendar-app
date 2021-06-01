const moment = require('moment');



const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false; //si retorna false, entonces ese campo no es correcto
    }

    const fecha = moment(value);

    if (fecha.isValid) {

        return true;
    } else {
        return false;
    }


}




module.exports = {

    isDate

}