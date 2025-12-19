export function interpretCycle(cycle) {
    return {
        timestamp: new Date(cycle.start_time).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "medium",
        }),
        cooler:
            cycle.output1 <= 5
                ? "Close to total failure"
                : cycle.output1 <= 25
                    ? "Reduced efficiency"
                    : "Full efficiency",

        valve:
            cycle.output2 >= 95
                ? "Optimal switching behavior"
                : cycle.output2 >= 85
                    ? "Small lag"
                    : cycle.output2 >= 75
                        ? "Severe lag"
                        : "Close to total failure",

        pump:
            cycle.output3 === 0
                ? "No leakage"
                : cycle.output3 === 1
                    ? "Weak leakage"
                    : "Severe leakage",

        accumulator:
            cycle.output4 >= 125
                ? "Optimal pressure"
                : cycle.output4 >= 110
                    ? "Slightly reduced pressure"
                    : cycle.output4 >= 95
                        ? "Severely reduced pressure"
                        : "Close to total failure",
    };
}
