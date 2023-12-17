const aws = require("aws-sdk");
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.CHAVE_ID,
    secretAccessKey: process.env.CHAVE_APP,
  },
});

const carregar = async (path, buffer, mimetype) => {
  const imagem = await s3
    .upload({
      Bucket: process.env.BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return imagem;
};

module.exports = {
  carregar,
};
