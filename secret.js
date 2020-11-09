const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

async function main(
  projectId,
  secretName,
  secretVersion
) {
  const secretClient = new SecretManagerServiceClient()
  const secretPath = `projects/${projectId}/secrets/${secretName}/versions/${secretVersion}`

  const data = await secretClient.accessSecretVersion({
    name: secretPath
  })
  const [secrets] = await secretClient.listSecrets({
    parent: `projects/${projectId}`
  })
  secrets.forEach((secret) => {
    const policy = secret.replication
    console.log(`${secret.name} (${policy})`)
  })
  console.log(data)
  const [accessResponse] = data
  // Extract the payload as a string.
  const responsePayload = accessResponse.payload.data.toString()
  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
  console.info(`Payload: ${responsePayload}`)
}

main(...process.argv.slice(2));
