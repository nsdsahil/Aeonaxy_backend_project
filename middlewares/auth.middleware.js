
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const authenticate = async (req, res, next) => {
    try {
        const token = req.header('auth-token').replace('Bearer ', '');
        if (!token) {
            throw new Error( "token not found" );
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();

           
        
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate', error: error.message });
    }
};
const authorizeSuperadmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access forbidden. Superadmin privileges required.' });
    }
    next();
};


export { authenticate, authorizeSuperadmin };
