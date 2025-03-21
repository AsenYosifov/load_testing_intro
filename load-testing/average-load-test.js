import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10m', target: 50 }, // Покачване до 50 потребители
    { duration: '30m', target: 50 }, // Поддържане на натоварването
    { duration: '5m', target: 0 },  // Постепенно намаляване
  ],
};

export default function () {
  let res = http.get('http://localhost:8080/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
