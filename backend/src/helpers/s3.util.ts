import {S3Client} from "@aws-sdk/client-s3";

const config = {
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
};
export const s3 = new S3Client(config);

//AWS Brach
