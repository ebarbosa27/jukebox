export default function requireBody(keys) {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).send("Body is missing from request.");
    }

    const missing = keys.find((key) => {
      return !(key in req.body);
    });
    if (missing) {
      return res.status(400).send("Item is missing from body");
    }
    next();
  };
}
