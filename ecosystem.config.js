module.exports = {
  apps: [
    {
      name: "telegram-bot",
      // port: 3001,
      exec_mode: "cluster",
      instances: 1,
      script: "./build/app.js",
      args: "",
      node_args : '-r dotenv/config',
    },
  ],
};
