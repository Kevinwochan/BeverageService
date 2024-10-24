import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class BeverageServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'IoTDataTable', {
      partitionKey: { name: 'device_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Serve DDB table
    const api = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'ApiFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: 'lambdas/Api/index.ts',
      environment: {
        TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      bundling: {
        externalModules: ['aws-sdk']
      }
    })
    api.addFunctionUrl();
    table.grantReadData(api);


    /*
     Iot Rule Role
     This role is used to allow IoT Core to write to S3 Hot bucket
    */
    const iotHandler = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'IotHandlerFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: 'lambdas/IotHandler/index.ts',
      environment: {
        TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      bundling: {
        externalModules: ['aws-sdk']
      }
    })
    table.grantReadWriteData(iotHandler);

    const iotRuleRole = new cdk.aws_iam.Role(this, 'IotRuleRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('iot.amazonaws.com')
    });
    const log = new cdk.aws_logs.LogGroup(this, 'ApiLogGroup');
    log.grantWrite(iotRuleRole);

    const iotServicePrincipal = new cdk.aws_iam.ServicePrincipal('iot.amazonaws.com');
    iotHandler.grantInvoke(iotServicePrincipal);

    // topic name is 'sensor/#', should match the topic in device types
    const iotRule = new cdk.aws_iot.CfnTopicRule(this, 'TopicRule', {
      topicRulePayload: {
        sql: "SELECT * FROM 'sensor/#'",
        actions: [
          {
            lambda: {
              functionArn: iotHandler.functionArn
            }
          }
        ],
        errorAction: {
          cloudwatchLogs: {
            logGroupName: log.logGroupName,
            roleArn: iotRuleRole.roleArn
          }
        }
      }
    })
  }
}
