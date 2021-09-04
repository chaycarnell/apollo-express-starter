require('dotenv').config();

const requiredEnvVars = ['NODE_ENV', 'PORT'];

const missingVars = requiredEnvVars.filter(
  (variable) => process.env[variable] === undefined,
);

if (missingVars.length > 0) {
  console.log('Aborting environment variables missing: ', missingVars);
  // @ts-expect-error
  if (typeof jest === 'undefined') process.exit();
}

const { NODE_ENV, PORT } = process.env;

export default {
  NODE_ENV,
  PORT,
};
