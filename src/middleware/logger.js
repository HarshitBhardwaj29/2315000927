const axios = require("axios");

async function Log(stack, level, pkg, message) {
    try {
        await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: pkg,
                message,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            }
        );
    } catch (error) {
        console.error("Logging failed");
    }
}

module.exports = Log;