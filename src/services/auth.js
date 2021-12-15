export const authMiddleware = (req, res, next) => {
    if(!req.auth) 
    res.send({error:-1, descripcion:`ruta ${req.path} metodo ${req.method} no autorizada`});
    else next();
}