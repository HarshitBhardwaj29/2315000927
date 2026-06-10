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

    for (const depot of depots) {
        const result = solveKnapsack(
            vehicles,
            depot.MechanicHours
        );

        console.log("\n=================================");
        console.log(`Depot ID: ${depot.ID}`);
        console.log(
            `Mechanic Hours: ${depot.MechanicHours}`
        );

        console.log("\nSelected Tasks:");

        result.selectedVehicles.forEach(vehicle => {
            console.log(
                `TaskID: ${vehicle.TaskID}`
            );
            console.log(
                `Duration: ${vehicle.Duration}`
            );
            console.log(
                `Impact: ${vehicle.Impact}`
            );
            console.log("-------------------------");
        });

        console.log(
            `Total Duration: ${result.totalDuration}`
        );

        console.log(
            `Maximum Impact: ${result.maxImpact}`
        );

        console.log("=================================");
    }
}

main();



function solveKnapsack(vehicles, mechanicHours) {
    const n = vehicles.length;
    const dp = Array.from({ length: n + 1 }, () =>
        Array(mechanicHours + 1).fill(0)
    );
    for (let i = 1; i <= n; i++) {
        const duration = vehicles[i - 1].Duration;
        const impact = vehicles[i - 1].Impact;

        for (let w = 0; w <= mechanicHours; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(
                    impact + dp[i - 1][w - duration],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    const selectedVehicles = [];

    let w = mechanicHours;

    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedVehicles.push(vehicles[i - 1]);
            w -= vehicles[i - 1].Duration;
        }
    }
    const totalDuration = selectedVehicles.reduce(
        (sum, vehicle) => sum + vehicle.Duration,
        0
    );

    return {
        maxImpact: dp[n][mechanicHours],
        totalDuration,
        selectedVehicles: selectedVehicles.reverse()
    };
}