interface IEnvs {
  BACKEND_API_URL: string;
}

export const envs: IEnvs = {
  BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:4000',
};
