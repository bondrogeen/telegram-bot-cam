module.exports = {
  apps: [
    {
      name: "telegram-bot",
      // port: 3001,
      exec_mode: "cluster",
      instances: 1,
      script: "npm run start",
      args: "",
    },
  ],
};
