//error handler function
module.exports = (err, req, res, next) => {
   console.log('error middleware');
   if (err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
   else return res.status(500).send('An unknown error occured.');

   try {
      
   } catch (err) {
      console.log('caught error');
      return res.status(500).send('An unknown error occured.');
   }
}

const handleDuplicateKeyError = (err, res) => {
   console.log(err);
   const field = Object.keys(err.keyValue);
   const code = 409;
   const error = `This ${field} already exists.`;
   return res.status(code).send({ message: error, fields: field });
}