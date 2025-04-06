module.exports = {
  apps: [
    {
      name: "telegram-bot-cam",
      // port: 3001,
      exec_mode: "cluster",
      instances: 1,
      script: "./app.mjs",
      args: "",
    },
  ],
};
