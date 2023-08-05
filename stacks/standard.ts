import { StackContext, NextjsSite, Config } from "sst/constructs";

export default function Default({ stack }: StackContext) {
  const site = new NextjsSite(stack, "standard-site", {
    path: "apps/standard",
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
  });
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
