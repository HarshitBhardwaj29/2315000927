require("dotenv").config();

const axios = require("axios");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// console.log(process.env.ACCESS_TOKEN);
async function fetchDepots() {
    try {
        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/depots",
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            }
        );

        return response.data.depots;
    } catch (error) {
        console.error(
            "Error fetching depots:",
            error.response?.data || error.message
        );
        return [];
    }
}

async function fetchVehicles() {
    try {
        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/vehicles",
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            }
        );

        return response.data.vehicles;
    } catch (error) {
        console.error(
            "Error fetching vehicles:",
            error.response?.data || error.message
        );
        return [];
    }
}

async function main() {
    const depots = await fetchDepots();
    const vehicles = await fetchVehicles();

    console.log("\n=== Depots ===");
    console.table(depots);

    console.log("\n=== Vehicles ===");
    console.table(vehicles);
}

main();