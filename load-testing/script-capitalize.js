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
  const url = 'http://localhost:8080/capitalize';
  const payload = JSON.stringify({ text: 'hello world' });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res = http.post(url, payload, params);

  if (res.status !== 200) {
    console.error(`Unexpected status code: ${res.status}. Response: ${res.body}`);
    return;
  }

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(res.body);
  } catch (e) {
    console.error('Failed to parse JSON response:', res.body);
    return;
  }

  check(jsonResponse, {
    'response is correct': (r) => r.text === 'HELLO WORLD',
  });

  sleep(1);
}
