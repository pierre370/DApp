export const networks = {
    development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*"
    }
};
export const compilers = {
    solc: {
        version: "0.8.10",
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};