module.exports = {
  fakestore: {
    input: './openapi.json',
    output: {
      mode: 'tags-split',
      target: './src/api/fakestore.ts',
      schemas: './src/api/fakestore-schemas.ts',
      client: 'react-query', // or 'axios' if you prefer
    },
  },
};
