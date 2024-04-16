interface IEnvs {
  API_HTTP_URL: string;
  API_WS_URL: string;
}

export const envs: IEnvs = {
  API_HTTP_URL: process.env.API_HTTP_URL || 'http://localhost:4000',
  API_WS_URL: process.env.API_WS_URL || 'http://localhost:5000',
};
