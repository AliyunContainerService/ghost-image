// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: process.env.GHOST_URL || '',
        mail: {},

        // 配置MySQL 数据库
        database: {
          client: 'mysql',
          connection: {
            'user': process.env.GHOST_MYSQL_USER || process.env.MYSQL_ENV_MYSQL_USER || 'ghost',
            'password': process.env.GHOST_MYSQL_PASSWORD || process.env.MYSQL_ENV_MYSQL_PASSWORD || 'changeme',
            'host': process.env.GHOST_MYSQL_HOST || 'mysql',
            'port': process.env.GHOST_MYSQL_PORT || 3306,
            'database': process.env.GHOST_MYSQL_DATABASE || process.env.MYSQL_ENV_MYSQL_DATABASE || 'ghost_db',
            charset  : 'utf8'
          }
        },

        server: {
            host: '127.0.0.1',
            port: '2368'
        },
        // 参考文档： http://www.ghostchina.com/ghost-0-5-5-chinese-edition-released/
        storage: {
            provider: 'oss',
            bucketname: process.env.OSS_BUCKET || 'root',
            ACCESS_KEY: process.env.OSS_ACCESS_KEY_ID || 'changeme',
            SECRET_KEY: process.env.OSS_ACCESS_KEY_SECRET || 'changeme',
            root: process.env.OSS_ROOT || '/image/',
            endpoint: process.env.OSS_ENDPOINT || 'http://oss-cn-hangzhou.aliyuncs.com',  //阿里云的上传端点是分地域的，需要单独设置
            prefix: process.env.OSS_PREFIX || 'http://your-bucket-name.oss-cn-hangzhou.aliyuncs.com' //阿里云的 OSS HTTP 地址
        },
        paths: {
            contentPath: process.env.GHOST_CONTENT
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
