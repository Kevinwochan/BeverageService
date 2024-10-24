import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class BeverageServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new dynamodb.TableV2(this, 'BeerTable', {
      partitionKey: {
        name: 'device_id',
        type: dynamodb.AttributeType.STRING
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Serve DDB table
    const api = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'ApiFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: 'lambdas/Api/index.js',
      environment: {
        TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      bundling: {
        externalModules: ['@aws-sdk/client-dynamodb', '@aws-sdk/util-dynamodb']
      }
    })
    api.addFunctionUrl({
      authType: cdk.aws_lambda.FunctionUrlAuthType.NONE
    });
    table.grantReadData(api);


    /*
     Iot Rule Role
     This role is used to allow IoT Core to write to S3 Hot bucket
    */
    const iotHandler = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'IotHandlerFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: 'lambdas/IotHandler/index.js',
      environment: {
        TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      bundling: {
        externalModules: ['@aws-sdk/client-dynamodb', '@aws-sdk/util-dynamodb']
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

    // topic name is 'BeerSensor/Cafeteria/1', should match the topic in device types
    const iotRule = new cdk.aws_iot.CfnTopicRule(this, 'TopicRule', {
      topicRulePayload: {
        sql: "SELECT *, topic(2) as location, topic(3) as device_id FROM 'BeerSensor/#'",
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
