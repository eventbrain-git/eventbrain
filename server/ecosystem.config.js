module.export = {
    apps: [
        {
            name:"eventbrain",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "environnement-variable",
            }
        }
    ]
}