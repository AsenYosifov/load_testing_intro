import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 200 }, // Внезапно увеличение
    { duration: '2m', target: 200 },  // Задържане на високо ниво
    { duration: '10s', target: 0 },  // Бързо намаляване
  ],
};

export default function () {
  let res = http.get('http://localhost:8080/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
