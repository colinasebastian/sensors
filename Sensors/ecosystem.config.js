module.exports = {
    apps: [{
        name: 'APIGateway',
        cwd: './APIGateway',
        script: './index.js',
        args: '--port 8080',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 2,
        exec_mode: "cluster"
    }, {
        name: 'Analytics',
        cwd: './Analytics',
        script: './index.js',
        args: '--port 8081',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 3,
        exec_mode: "cluster"
    }, {
        name: 'Catalog',
        cwd: './Catalog',
        script: './index.js',
        args: '--port 8082',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 1,
        exec_mode: "cluster"
    }, {
        name: 'Exporter',
        cwd: './Exporter',
        script: './index.js',
        args: '--port 8083',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 1,
        exec_mode: "cluster"
    }, {
        name: 'Observations',
        cwd: './Observations',
        script: './index.js',
        args: '--port 8084',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 3,
        exec_mode: "cluster"
    }, {
        name: 'Logger',
        cwd: './Logger',
        script: './index.js',
        args: '--port 8085',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 1,
        exec_mode: "cluster"
    }, {
        name: 'Authentication',
        cwd: './Authentication',
        script: './index.js',
        args: '--port 8086',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        instances: 1,
        exec_mode: "cluster"
    }]
};
