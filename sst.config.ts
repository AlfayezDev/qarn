import { SSTConfig } from "sst";
import Platform from "./stacks/platform";
import Standard from "./stacks/standard";

export default {
    config(_input) {
        return {
            name: "qarn",
            region: "us-east-1",
            role: "default",
            ssmPrefix: '/qarn',
            profile: "sst"
        };
    },
    stacks(app) {
        // app.stack(Platform);
        app.stack(Standard);
    },
} satisfies SSTConfig;