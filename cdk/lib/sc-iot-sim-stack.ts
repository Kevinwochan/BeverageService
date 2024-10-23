import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class ScIotSimStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*
     Hot Bucket
     This S3 bucket is used for storing recent IoT data directly from IoT Core
    */
    const bucket = new cdk.aws_s3.Bucket(this, 'ScIotSimBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    /*
     Iot Rule Role
     This role is used to allow IoT Core to write to S3 Hot bucket
    */
    const iotRuleRole = new cdk.aws_iam.Role(this, 'IotRuleRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('iot.amazonaws.com'),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSIoTThingsRegistration'),
      ]
    })
    bucket.grantReadWrite(iotRuleRole);

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'IoTDataTable', {
      partitionKey: { name: 'device_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Grant permissions to the IoT rule role to write to DynamoDB
    table.grantWriteData(iotRuleRole);


    // topic name is 'sensor/#', should match the topic in device types
    new cdk.aws_iot.CfnTopicRule(this, 'TopicRule', {
      topicRulePayload: {
        sql: "SELECT topic(2) as device_id, timestamp() as timestamp, temperature, humidity, topic(1) as sensor_type, topic(2) as location FROM 'sensor/#'",
        actions: [
          {
            s3: {
              bucketName: bucket.bucketName,
              key: "${sensor_type}/${location}/${timestamp()}.json",
              roleArn: iotRuleRole.roleArn,
            }
          },
          {
            lambda: {
              functionArn: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

            }
          },
          {
            dynamoDBv2: {
              roleArn: iotRuleRole.roleArn,
              putItem: {
                tableName: table.tableName
              }
            }
          }
        ]
      }
    })

  }
}
