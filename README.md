# Weather

`Test task result AWS frontend+backend`

## frontend

A frontend in Vue, with a simple request to AWS API Gateway

`The code is in App.vue`

## lambda

A node server, uploaded as Lambda function to AWS, called by AWS API Gateway

# NOTES

### This was my first project fully in AWS Environment.

#### The challenging part for me was to make it work in VPC.

As ElastiCache worked with lambda only in VPC, had to move SecretsManager into VPC as well, then edit Gateway, reconfigure the NAT and routes to open up VPC to call OWeather API, etc. 
