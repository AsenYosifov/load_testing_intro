import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,  // Малък брой виртуални потребители
  duration: '30s',  // Кратка продължителност
};

export default function () {
  let res = http.get('http://localhost:8080/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
