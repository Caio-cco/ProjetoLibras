import jwt from "jsonwebtoken";

const KEY = "borapracima";


export function generateToken(userInfo) {
  return jwt.sign(
    {
      id: userInfo.id_usuario || userInfo.id,
      nome: userInfo.nome || userInfo.name,
      email: userInfo.email,
      foto_url: userInfo.foto_url || userInfo.picture,
      role: userInfo.role || "user", // padrão é "user"
    },
    KEY,
    { expiresIn: "7d" }
  );
}


export function getTokenInfo(req) {
  try {
    const token =
      req.headers["x-access-token"] ||
      req.query["x-access-token"] ||
      req.headers.authorization?.split(" ")[1];

    if (!token) return null;
    return jwt.verify(token, KEY);
  } catch {
    return null;
  }
}


export function getAuthentication(checkRole = null, throw401 = true) {
  return (req, res, next) => {
    try {
      const token =
        req.headers["x-access-token"] ||
        req.query["x-access-token"] ||
        req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token ausente");

      const decoded = jwt.verify(token, KEY);
      req.user = decoded;

    
      if (checkRole && !checkRole(decoded)) {
        return res.status(403).json({ erro: "Acesso negado. Requer permissão de administrador." });
      }

      next();
    } catch {
      if (throw401)
        return res.status(401).json({ erro: "Token inválido ou não fornecido." });
      next();
    }
  };
}