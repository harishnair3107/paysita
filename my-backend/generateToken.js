// const jwt = require('jsonwebtoken');

// // Your base (non-encoded) secret key from Paysprint

// // Encode the secret key to base64, same as TextCodec.BASE64.encode() in Java
// const secretKey ='UFMwMDYxMzU2YjI2NDQ1MjI1NmMwNWE2MGQzMTZjNmY0ODc3MzhmOTE3NDcyODY5NDY=' ;

// // Utility to generate random reqid (like Java getRandom())
// const generateReqId = () => Math.floor(Math.random() * 1000000000);

// // Utility to get current timestamp (in seconds, like Java's Instant.now().getEpochSecond())
// const getTimestamp = () => Math.floor(Date.now() / 1000);

// // Build JWT token
// const getToken = () => {
//   const token = jwt.sign(
//     {
//                    // Optional
//       timestamp: getTimestamp(),       // Required
//       partnerId: 'PS006135',             // Replace with your actual partner ID
//       reqid: generateReqId()           // Required
//     },
//     secretKey,
//     {
//       algorithm: 'HS256',
//       header: {
//         typ: 'JWT',
//         alg: 'HS256'
//       }
//     }
//   );

//   return token;
// };

// // Example usage
// console.log('Generated JWT Token:', getToken());
