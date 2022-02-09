
const { exec } = require("child_process");

const enableFormatWhileServing = false;

const transferModules = [
  //
  "vue-loading-rx",
  "vuetify",
];

// copy from src/environment.ts
const env = process.env;
const environment = {
  env: env.NODE_ENV,
  baseUrl: env.BASE_URL,
  title: env.VUE_APP_Title,
  apiHost: env.VUE_APP_ApiHost,
  logLevel: env.VUE_APP_LogLevel,
  connectMode: env.VUE_APP_ConnectMode,
};

const dev = process.env.NODE_ENV === 'development' ? '_dev' : ''

console.log(environment);

const proxyHost = environment.apiHost;

console.log(`target proxyHost: `, proxyHost);

async function executeCmd(name, cmd)
{
  try
  {
    const start = new Date();
    const result = await new Promise((rs, rj) =>
    {
      console.log(`Starting to execute ${name}`);
      exec(cmd, (err, stdout, stderr) =>
      {
        rs(stdout.toString());
      });
    });
    // console.log(result);
    const ms = (new Date().getTime() - start.getTime()) / 1000;
    console.log("\n");
    console.log(`Finish ${name}! Time elapsed ${ms} ms`);
    console.log("\n");
  } catch (error)
  {
    console.error(error);
  }
}

module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    /node_modules[/\\](vue-loading-rx|vuetify)[/\\]/,
    'vuetify'
  ],
  configureWebpack: {
    optimization: {
      runtimeChunk: true,
    },
    devServer: {
      disableHostCheck: true,
      compress: true,
      proxy: {
        "^/api/": {
          target: proxyHost,
          ws: true,
          changeOrigin: true,
        },
      },
      headers: {
        "cache-control": " no-cache,  max-age=1, must-revalidate",
      },
      setup: function (app, server)
      {
        app.use(function (req, res, next)
        {
          // just for debug use
          // console.log(req.path);
          next();
        });
      },
    },
    devtool: "source-map",
    resolve: {
      // alias: {
      //   '*': path.resolve(
      //       __dirname, './src'
      //   ),
      //   '@': path.resolve(
      //       __dirname, './src/components'
      //   ),
      //   '#': path.resolve(
      //       __dirname, './src/helpers'
      //   ),
      //   '%': path.resolve(
      //       __dirname, './src/views'
      //   ),
      //   '&': path.resolve(
      //       __dirname, './src/plugins'
      //   ),
      //   semantic: path.resolve(
      //       __dirname, './semantic'
      //   )
      // }
    },
  },
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.ts",
      nodeIntegration: true,
      outputDir: "electron-builder-output",
      builderOptions: {
        productName: "Pirate",
        appId: "com.birdwind.pirate.todolist" + dev,
        artifactName: '${name}.${ext}', // 檔案名稱樣板，有 ESLint 記得關掉
        copyright: "Copyright © 2022 by PirateShip & Powered By BirdWind",
        win: {
          target: [{
            target: 'nsis', // 檔案類型
            arch: ["x64", "ia32"] // 檔案位元，越多類型檔案越大
          }],
          verifyUpdateCodeSignature: false
        },
        dmg: {},
        linux: {
          category: "Office",
          target: "AppImage",
          // arch: ["armv7l"]
        },
        mac: {
          // category: "public.app-category.productivity",
          target: [
            "dmg",
            "zip"
          ]
        },
        files: ['**/*'],
        // extraResources: {
        //   from: 'resources/',
        //   to: './'
        // },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true
        },
      }
    },
  },
};
