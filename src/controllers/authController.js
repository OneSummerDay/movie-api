import { generateToken } from '../utils/jenerateToken.js';
import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {
    const {name, email, password} = req.body;
    
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    });

    if (userExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const token = generateToken();

    res.status(201).json({ 
        status: 'success',
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token,
        }
     });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid mail or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid mail or password' });
    }

    const token = generateToken(user.id, res);

    res.status(201).json({ 
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email
            },
            token,
        }
     });
}

const logout = (req, res) => {
    res.status(200).json({
        status: "succsess",
        message: "Loged out succsessguly",
    })
}

export { register, login, logout };