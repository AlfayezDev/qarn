import { StackContext, NextjsSite, Config, } from "sst/constructs";
import { Duration } from "aws-cdk-lib";
import {
    CachePolicy,
    CacheQueryStringBehavior,
    CacheHeaderBehavior,
    CacheCookieBehavior,
} from "aws-cdk-lib/aws-cloudfront";
export default function Platform({ stack, app }: StackContext) {

    const site = new NextjsSite(stack, "platform-site", {
        path: "apps/platform",
        bind: [
            new Config.Secret(stack, "CLERK_SECRET_KEY"),
            new Config.Secret(stack, "DATABASE_URL"),
            new Config.Secret(stack, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
            new Config.Secret(stack, "AXIOM_TOKEN"),
            new Config.Secret(stack, "STRIPE_API_KEY"),
            new Config.Secret(stack, "STRIPE_WEBHOOK_SECRET"),
            new Config.Secret(stack, "NEXT_PUBLIC_STRIPE_STD_PRODUCT_ID"),
            new Config.Secret(stack, "NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID"),
            new Config.Secret(stack, "NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID"),
            new Config.Secret(stack, "NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID"),
        ],
        cdk: {
            serverCachePolicy: new CachePolicy(stack, "ServerCache", {
                queryStringBehavior: CacheQueryStringBehavior.all(),
                headerBehavior: CacheHeaderBehavior.none(),
                cookieBehavior: CacheCookieBehavior.all(),
                defaultTtl: Duration.days(0),
                maxTtl: Duration.days(365),
                minTtl: Duration.days(0),
                enableAcceptEncodingBrotli: true,
                enableAcceptEncodingGzip: true,
            })
        },
        edge: true,
        environment: {
            VERCEL_URL:
                app.stage === "dev"
                    ? "https://d3iqc38eggjivo.cloudfront.net"
                    : app.stage === "preview"
                        ? "https://d2scvyd9ofhm5o.cloudfront.net"
                        : "http://localhost:3000",
            NEXTJS_URL:
                app.stage === "dev"
                    ? "https://d3iqc38eggjivo.cloudfront.net"
                    : app.stage === "preview"
                        ? "https://d2scvyd9ofhm5o.cloudfront.net"
                        : "http://localhost:3000",
        },

    });
    stack.addOutputs({
        URL: site.customDomainUrl || site.url || "http://localhost:3000",
    });
}