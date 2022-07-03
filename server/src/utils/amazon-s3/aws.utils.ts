import S3, {PutObjectAclRequest} from 'aws-sdk/clients/s3';
import fs from "fs"

import {awsBucketName, awsBucketRegion, awsAccessKey, awsSecretAccessKey} from "../../config/keyes"

const s3 = new S3({
   region: "eu-central-1",
   accessKeyId: "AKIATT56L6ULFGS7IMOL",
   secretAccessKey: "v6eItdJeeFxyWW6goHZkYh3OnooLgj4CU/gqgUxk+/1SPrc"
})
console.log("awsSecretAccessKey", awsSecretAccessKey, "awsBucketName", awsBucketName, "awsAccessKey", awsAccessKey)
// uploads a file to s3
//@ts-ignore
export const uploadFile = (file) => {
   // const fileStream = fs.createReadStream(file.path)
   const uploadParams = {
      Bucket: "main-project-images",
      Body: "testhaaha",
      Key: "testowyPlik"
   }
   return s3.upload(uploadParams).promise()
}
// dowdnloads a file from s3