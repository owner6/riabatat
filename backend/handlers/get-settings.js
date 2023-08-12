module.exports.handler = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'hello settings',
          input: event,
        },
        null,
        2
      ),
    };
  };