import { Cluster } from 'ioredis';

export const clusterNodes = [
  { host: '0.0.0.0', port: 7000 },
  { host: '0.0.0.0', port: 7001 },
  { host: '0.0.0.0', port: 7002 },
  { host: '0.0.0.0', port: 7003 },
  { host: '0.0.0.0', port: 7004 },
  { host: '0.0.0.0', port: 7005 },
];

export const cluster = new Cluster(clusterNodes);
