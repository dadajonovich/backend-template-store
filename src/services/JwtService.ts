import jwt from 'jsonwebtoken';

type UserJwtData = {
  id: number;
};

export class JwtService {
  public static createPair(userObj: UserJwtData) {
    const access = jwt.sign(userObj, process.env.PUBLIC_KEY!, {
      algorithm: 'RS256',
      expiresIn: '15m',
    });

    const refresh = jwt.sign(userObj, process.env.PRIVATE_KEY!, {
      algorithm: 'RS256',
      expiresIn: '15d',
    });

    return { access, refresh };
  }

  public static validate(token: string, isAccess: boolean) {
    return jwt.verify(
      token,
      isAccess ? process.env.PUBLIC_KEY! : process.env.PRIVATE_KEY!
    ) as UserJwtData;
  }
}
