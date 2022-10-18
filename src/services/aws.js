import 'dotenv/config' 
import AWS from 'aws-sdk';

export default {

  uploadToS3: function (file, filename, acl = 'public-read') {

    return new Promise((resolve, reject) => {
      let IAM_USER_KEY = process.env.IAM_USER_KEY;
      let IAM_USER_SECRET = process.env.IAM_USER_SECRET;
      let BUCKET_NAME = process.env.BUCKET_NAME;

      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
      });

      s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: file,
          ACL: acl,
        };

        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log(err);
            return resolve({ error: true, message: err });
          }
          console.log(data);
          return resolve({ error: false, message: data });
        });
      });
    });
  },
  deleteFileS3: function (key) {
    return new Promise((resolve, reject) => {
      let IAM_USER_KEY = process.env.IAM_USER_KEY;
      let IAM_USER_SECRET = process.env.IAM_USER_SECRET;
      let BUCKET_NAME = process.env.BUCKET_NAME;

      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
      });

      s3bucket.createBucket(function () {
        s3bucket.deleteObject(
          {
            Bucket: BUCKET_NAME,
            Key: key,
          },
          function (err, data) {
            if (err) {
              console.log(err);
              return resolve({ error: true, message: err });
            }
            console.log(data);
            return resolve({ error: false, message: data });
          }
        );
      });
    });
  },
};
