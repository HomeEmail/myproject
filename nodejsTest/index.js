var env=require('./prod.env');
console.log(env);
console.log(env.NODE_ENV);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = env.NODE_ENV;
}
console.log(process.env);
console.log(process.env.NODE_ENV);
