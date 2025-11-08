export function serverErrorHandler(error, req, res, next) {
    console.error("[ERROR]", error.message);
    console.error(error.stack);
    if (req.headers['accept'] && req.headers['accept'].includes('text/html')) {
        res.status(500).render(
            'error.html',
            {
                errNumber: 500,
                title: 'Internal Server Error',
                message: 'Unexpected Error. Try again later'
            }
        );
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
};