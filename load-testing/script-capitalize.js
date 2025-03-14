// capitalizeLoadTest.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    scenario1: {
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
    },
    scenario2: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function () {
  const url = 'http://localhost:3000/capitalize';
  const payload = JSON.stringify({ text: 'hello world' });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is correct': (r) => JSON.parse(r.body).text === 'HELLO WORLD',
  });

  sleep(1);
}
