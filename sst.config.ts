import { SSTConfig } from "sst";
import { Platform } from "./stacks/platform";

export default {
    config(_input) {
        return {
            name: "qarn",
            region: "us-east-1",
            role: "default",
            ssmPrefix: '/qarn',

        };
    },
    stacks(app) {
        app.stack(Platform);
    },
} satisfies SSTConfig;