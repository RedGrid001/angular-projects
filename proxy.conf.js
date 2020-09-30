const proxy = [
  {
    context: '/apirest',
    target: 'http://localhost:8080',
    pathRewrite: {'^/apirest' : ''}
  }
];

module.exports = proxy;