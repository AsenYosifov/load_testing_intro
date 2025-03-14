
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8080/capitalize';
  const payload = JSON.stringify({ text: 'hello world' });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log('Response status: ' + res.status);
  console.log('Response body: ' + res.body);

  sleep(1);
}
