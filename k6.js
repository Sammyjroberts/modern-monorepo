import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

// Custom metrics
const failureRate = new Rate('failures');

// Test configuration
export const options = {
  // Basic test
  vus: 50,               // Number of virtual users (concurrent connections)
  duration: '30s',       // Test duration

  // Stages for ramping up/down
  /*
  stages: [
    { duration: '30s', target: 50 },   // Ramp up to 50 users over 30s
    { duration: '1m', target: 50 },    // Stay at 50 users for 1 minute
    { duration: '20s', target: 100 },  // Ramp up to 100 users over 20s
    { duration: '1m', target: 100 },   // Stay at 100 users for 1 minute
    { duration: '30s', target: 0 },    // Ramp down to 0 users over 30s
  ],
  */

  // Thresholds for pass/fail criteria
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.05'],    // Less than 5% of requests should fail
    failures: ['rate<0.05'],           // Custom failure rate should be less than 5%
  },
};

// Request payload
const payload = JSON.stringify({
  name: 'Sammy'
});

// Request parameters
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  // Send POST request to the endpoint
  const response = http.post('http://localhost:8081/v1/example/echo', payload, params);

  // Check if response is successful
  const checkRes = check(response, {
    'status is 200': (r) => r.status === 200,
    'response has greeting': (r) => r.json().hasOwnProperty('greeting'),
  });

  // Update custom metrics
  failureRate.add(!checkRes);

  // Output response for debugging (only in the first few iterations)
  if (__ITER <= 2) {
    console.log(`Response status: ${response.status}`);
    console.log(`Response body: ${response.body}`);
    console.log(`Response time: ${response.timings.duration}ms`);
  }

  // Optional sleep between iterations
  sleep(0.1);  // 100ms sleep between requests
}

// An optional teardown function that can be used to stop the test
export function teardown(data) {
  // You could send a cleanup request here if needed
  console.log('Test completed');
}