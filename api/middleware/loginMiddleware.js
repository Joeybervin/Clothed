const isLoggedIn = (req, res, next) => {
    
    if (req.session && req.session.user) {
        
        next();
    } else {
        res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
        return res.redirect('/se-connecter');
    }
}

exports.module = { isLoggedIn };