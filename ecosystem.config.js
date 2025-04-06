module.exports = {
  apps: [
    {
      name: "telegram-bot-cam",
      // port: 3001,
      exec_mode: "cluster",
      instances: 1,
      script: "node ./build/app.js",
      args: "",
      node_args : '-r dotenv/config',
    },
  ],
};
