const hasRole = (role) => {
    return (req, res, next) => {
        let user_context = req.user_context;

        if(user_context.role === role) {
            next();
        } else {
            res.status(403).send();
        }
    };
}

module.exports = { hasRole };