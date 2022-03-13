//error handler function
module.exports = (err, req, res, next) => {
   console.log('error middleware');

   if (err.errors) return handleValidationError(err, res);
   else return res.status(500).send('An unknown error occured.');
}

const handleValidationError = (err, res) => {
   let errors = {};

   Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
   });

   return res.status(400).send({ message: Object.values(errors), fields: Object.keys(errors) });
}