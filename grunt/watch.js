module.exports = {
    grunt: {
        files: '<%= jshint.grunt %>',
        options: {
            reload: true
        }
    },

    code: {
        files: '<%= jshint.code %>',
        tasks: ['jshint:code', 'mochaTest']
    },

    tests: {
        files: '<%= jshint.tests %>',
        tasks: ['jshint:tests', 'mochaTest']
    }

};
