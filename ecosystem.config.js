const reference = require("./util/reference");

module.exports = {
  apps: [
    {
      name: reference.name,
      script: "./app.js",
      args: [
        "--color"
      ],
      instances: "1",
      exec_mode: "fork",
      watch: true,
      ignore_watch: [
        "./node_modules",
        "./ecosystem.config.js"
      ],
      max_memory_restart: "128M",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      min_uptime: 10000,
      listen_timeout: 30000,
      wait_ready: true,
      max_restarts: 5
    }
  ]
}