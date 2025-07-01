const crypto = require('crypto');

function base64url(source) {
  return Buffer.from(source)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const Jwt = {
  encode: (payload, secret, algorithm = 'HS256') => {
    const header = {
      typ: 'JWT',
      alg: algorithm
    };

    const headerEncoded = base64url(JSON.stringify(header));
    const payloadEncoded = base64url(JSON.stringify(payload));
    const data = `${headerEncoded}.${payloadEncoded}`;

    let signature;
    if (algorithm === 'HS256') {
      // Decode the secret from base64 before using it
      const secretKeyBuffer = Buffer.from(secret, 'base64');

      signature = crypto
        .createHmac('sha256', secretKeyBuffer)
        .update(data)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    } else {
      throw new Error('Unsupported algorithm');
    }

    return `${data}.${signature}`;
  }
};

module.exports = Jwt;
