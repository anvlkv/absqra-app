// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-hue-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    customLaunchers: {
      Chrome_with_files: {
        base: 'Chrome',
        flags: ['--allow-file-access-from-files']
      }
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      {pattern: './src/test.ts', watched: true}
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    webpack: { node: { fs: 'empty' } },
    angularCli: {
      environment: 'dev'
    },
    hueReporter: {
      ip: '192.168.1.10',
      user: 'Ba8MqTZlNf8ywuWIfnqKxEsxfdBxhrN8eVoJES6h',
      applyTo: 'groups',
      applyToId: 4
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'hue']
      : ['progress', 'kjhtml', 'hue'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_with_files'],
    singleRun: false
  });
};
