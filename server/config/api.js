module.exports = ({ env }) => ({
    responses: {
      privateAttributes: ['_v']
    },
    rest: {
        defaultLimit: -1,
    }
  });