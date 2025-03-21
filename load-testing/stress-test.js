import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, // Увеличаване на потребителите
    { duration: '10m', target: 200 }, // Силен стрес на системата
    { duration: '5m', target: 0 },  // Рязко намаляване
  ],
};

export default function () {
  let res = http.get('https://your-app-url.com');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
