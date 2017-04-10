import { Token } from './token';

// -------------------------------------------------------------------------------------------------
// FIXTURES
// -------------------------------------------------------------------------------------------------

const EXAMPLE_ENCODED_TOKEN = 'eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6ImFiZWxAY29va2luZ2ZveC5ubCIsImV4c' +
  'CI6MTQ5MTgyMDE0NCwiaWF0IjoxNDkxODE2NTQ0fQ.h9KHlT3W24GRunBMQfK6E7vf6exjMXbW8EejEdMlMOvzb48NmU-R' +
  'k717DhPNVXlSIPFi8bJf-jXvoe82pe3_U7x2U_jTBCAGESpkidr1fQlFJpBgRkY4axm32khef8_4a8LQdqwvm4hVe2gnEM' +
  'gbXpQFLLCafhtRo16AzIQ1SsvQDCccRWmZ4sG9wUY2qiFr_rRWkopB46OLNhX9pBSuvELe9H7Jo68TEMQU7H2uO3TKPyOt' +
  'FqiRALCwRhl371h7ygqI9atrIt1Wmw08Mf_pS4pxWA_z2rZJWu6wgDe3HFNTYJwmr-bh4Awyz2WSXZPvcd1dqkR9jufcvX' +
  'c8ZVtv0jvtjiHAR_EHpWKyv012acWlXCN0t7Cb6z1DqkabN0RxMbABOMG5AKcVzQ_Sq80-AJgE7ct2904sgFi7yGMaTjV4' +
  'Mpsh5LrJDJ3GZmKTW-aANpA7lgdPgX0V8mxGcO6hpa71pFjrMXZlJtWKi1kz7iIrdM84iwiKfHnnLws_D-jYqtZShzvYbL' +
  'dxdG6MgEYQLhrKzyuRVL4x_U4JysH0Px5q09Vo-6W551E9IizZnVTrR6OlDEg5QzA0FKAu4KKFrDSwpQN6KDgAPyNOGd0R' +
  'HxBOgkb8sN4lNmcgdLAezv0yxmJVrbymFhJc0p70Nlcf7sZt4QQXfufzHgmr-yptCeA';

const EXAMPLE_ENCODED_HEADER = btoa(JSON.stringify({ 'alg': 'RS256' }));
const EXAMPLE_SIGNATURE = '7lgdPgX0V8mxGcO6hpa71pFjrMXZlJtWKi1kz7iIrdM84iwiKfHnnLws_D-jYqtZShzvYbL';
const EXAMPLE_EXPIRATION_MILLISECONDS = 60 * 60 * 1000; // 1 hour

const EXAMPLE_PAYLOAD = {
  'exp': 1491820144,
  'iat': 1491816544
};

/**
 * Mock encoded token with provided timestamp, which is included in payload.
 * @param issuedAt When the token was issued by the server.
 * @returns string Encoded token.
 */
function mockEncodedToken(issuedAt: Date): string {
  const iatMillis = issuedAt.getTime();
  const expMillis = iatMillis + EXAMPLE_EXPIRATION_MILLISECONDS;
  const payload = {
    exp: Math.round(expMillis / 1000),
    iat: Math.round(iatMillis / 1000)
  };
  const encodedPayloadRaw: string = btoa(JSON.stringify(payload));
  const encodedPayload = encodedPayloadRaw.substring(0, encodedPayloadRaw.indexOf('='));

  return EXAMPLE_ENCODED_HEADER + '.' + encodedPayload + '.' + EXAMPLE_SIGNATURE;
}

// -------------------------------------------------------------------------------------------------
// TESTS
// -------------------------------------------------------------------------------------------------

describe('Token', () => {

  it('should throw when provided value is empty', () => {
    expect(() => new Token(null)).toThrow();
  });

  it('should throw when provided value has unexpected format', () => {
    expect(() => new Token('foo-bar')).toThrow();
  });

  it('should not throw when provided value is JWT encoded token', () => {
    expect(() => new Token(EXAMPLE_ENCODED_TOKEN)).not.toThrow();
  });

});
