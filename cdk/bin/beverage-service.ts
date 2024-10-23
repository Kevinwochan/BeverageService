#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { WebsiteStack } from '../lib/beverage-dashboard-stack';
import { BeverageServiceStack } from '../lib/beverage-service-stack';

const app = new cdk.App();
new BeverageServiceStack(app, 'BeverageServiceStack', {
  env: { region: "ap-southeast-2" }
});

new WebsiteStack(app, 'WebsiteStack', {
  env: { region: "ap-southeast-2" }
})