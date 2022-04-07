const AWS = require('aws-sdk'); 

const getSecret = async (secretName, region) => {
    
    const config = {
        region : region
    };
    
    
    let secretsManager = new AWS.SecretsManager(config);
    
    try {
        
        console.log('get secret...');
        let secretValue = await secretsManager.getSecretValue({SecretId: secretName}).promise();
        console.log('got secret!');
        
        if ('SecretString' in secretValue) {
            const secret = secretValue.SecretString;
            return secret;
        } else {
            let buff = new Buffer(secretValue.SecretBinary, 'base64');
            const decodedBinarySecret = buff.toString('ascii');
            return decodedBinarySecret;
        }
        
    } catch (err) {
        console.log('getSecret error', err);
        throw(err);
        
        /*
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        */
        
    }
    
}; 

module.exports = getSecret;