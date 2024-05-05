class LoggerCtrl {
    constructor() { }

    testInput = async (req, res) => {
        try {
            const { input } = req.params;
            req.logger.info("Petición GET recibida");
            req.logger.info({ user: `USER`, input });
            res.status(200).json(`¡Hola ${input}!`);
        } catch (error) {
            req.logger.error("🚀 ~ testError ~ error:", error)
        }
    };

    getLogger = async (req, res) => {
        try {
            const { log } = req.body;
            req.logger.info(log);
            res.status(200).json("Log recibido");
        } catch (error) {
            req.logger.error("🚀 ~ testError ~ error:", error)
        }
    };

    testWarn = async (req, res) => {
        try {
            req.logger.warn("Petición GET recibida en WARM 2");
            req.logger.warn("Petición GET recibida en WARM 2 NEW");
            res.send("¡Hola mundo WARN!");
        } catch (error) {
            req.logger.error("🚀 ~ testError ~ error:", error)
        }
    }

    testError = async (req, res) => {
        try {
            req.logger.error("Petición GET error recibida");
            throw new Error("Error de prueba");
        } catch (error) {
            req.logger.error("🚀 ~ testError ~ error:", error)
        }
    };
}

export default LoggerCtrl;