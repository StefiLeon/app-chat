export const authMiddleware = (req, res, next) => {
    if(!req.auth) res.sendStatus(403).send({error:-2, descripcion: "ruta delete products, metodo delete no autorizado"});
    else next();
}