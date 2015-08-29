exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumPort: 4444,
  specs: [
    '*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8080',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true
  }
};
