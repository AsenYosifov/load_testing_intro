import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            exec: 'testCapitalize',
            vus: 10, // 10 виртуални потребителя
            duration: '30s', // Продължителност на теста
        },
        scenario2: {
            executor: 'ramping-vus',
            exec: 'testCapitalize',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 20 }, // Увеличаване на броя на потребителите до 20 за 10 секунди
                { duration: '20s', target: 20 }, // Поддържане на 20 потребителя за 20 секунди
                { duration: '10s', target: 0 },  // Намаляване на броя на потребителите до 0 за 10 секунди
            ],
            gracefulRampDown: '10s',
        },
    },
};

export function testCapitalize() {
    let url = 'http://localhost:8080/capitalize'; // Заменете с вашия endpoint
    let payload = JSON.stringify({ text: 'hello world' });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'is status 200': (r) => r.status === 200,
        'is response correct': (r) => r.json('text') === 'HELLO WORLD',
    });

    sleep(1); // Пауза от 1 секунда между заявките
}