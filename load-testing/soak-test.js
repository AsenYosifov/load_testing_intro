import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1h', target: 100 }, // Дълго натоварване
    { duration: '2h', target: 100 }, // Поддържане
    { duration: '30m', target: 0 },  // Постепенно намаляване
  ],
};

export default function () {
  let res = http.get('https://your-app-url.com');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
