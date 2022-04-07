# Weather

`Test task result AWS frontend+backend`

## frontend

A frontend in Vue, with a simple request to AWS API Gateway

`The code is in App.vue`

## lambda

A node server, uploaded as Lambda function to AWS, called by AWS API Gateway

# NOTES

This was my first project fully in AWS Environment.

The only challenging part was configuring it to work in VPC .

```
As ElastiCache worked with lambda only in VPC, had to move SecretsManager into VPC as well.
```  
