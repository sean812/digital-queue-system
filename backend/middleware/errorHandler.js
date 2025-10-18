const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // logs the full error stack to the console

    const status = err.status || 500;

    res.status(status).json({
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;
