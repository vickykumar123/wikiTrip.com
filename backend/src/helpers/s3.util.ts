import {S3Client} from "@aws-sdk/client-s3";

const config = {
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_TOKEN_KEY!,
    secretAccessKey: process.env.AWS_SECRET_TOKEN_KEY!,
  },
};
export const s3 = new S3Client(config);
