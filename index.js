// Ref: https://banhawy.medium.com/securely-storing-and-retrieving-environment-variables-in-node-js-3cabc65623b
// Ref2: https://medium.com/intelliconnect-engineering/how-to-store-and-retrieve-your-secret-keys-using-aws-secrets-manager-727db222b785

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });
const secretsManager = new AWS.SecretsManager();
const kms = new AWS.KMS();

async function getSecret(secretName) {
  const params = {
    SecretId: secretName,
  };

  try {
    const response = await secretsManager.getSecretValue(params).promise();
    console.log("---Response: ", response);

    // Depending on whether the secret is a string or binary, one of these fields will be populated.
    if ("SecretString" in response) {
      const secret = response.SecretString;
      console.log({ secret });
    } else {
      const buff = Buffer.from(response.SecretBinary, "base64");
      const decodedBinarySecret = buff.toString("ascii");
      console.log({ decodedBinarySecret });
    }
  } catch (err) {
    console.error(`---ERROR retrieving secret: ---- ${err}`);
  }
}

// Usage
console.log(getSecret("my-app/tf/my-secret"));

// Secret manually created in the AWS Console:
console.log(getSecret("my-app/terraform/my-secret"));
