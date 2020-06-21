import * as JWT from 'jsonwebtoken';

const secret = 'something'; // TODO: Move this to config or something

export async function generateToken(user, password, role): Promise<string> {
    const payload = {
        id: user.id,
        email: user.email,
        role: role,
        name: user.name
    };

    return JWT.sign(payload, secret, {
        expiresIn: '1 day',
    });
}

export function verifyToken(token: string) {
    const claims = JWT.verify(token, secret) as { id: string, email: string };

    return claims;
}
