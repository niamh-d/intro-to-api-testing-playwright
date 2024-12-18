# HW-9 API TESTING

## TESTING SCENARIOS

### HW 9

| Method | Endpoint         | Scenario no. | +/- | Body/Params? | Expected res code |
|--------|------------------|--------------|-----|--------------|-------------------|
| PUT    | test-orders/{id} | 1            | +   | Body         | 200               |
| PUT    | test-orders/{id} | 2            | -   | Body         | 401               |
| PUT    | test-orders/{id} | 3            | -   | Body         | 400               |
| DELETE | test-orders/{id} | 4            | +   | N/A          | 204               |
| DELETE | test-orders/{id} | 5            | -   | N/A          | 401               |
| DELETE | test-orders/{id} | 6            | -   | N/A          | 401               |
| GET    | test-orders      | 7            | +   | Params       | 200               |
| GET    | test-orders      | 8            | -   | Params       | 400               |


| Scenario no. | Scenario description                                                          |
|--------------|-------------------------------------------------------------------------------|
| 1            | Request containing ID and valid key updates order and returns order object    |
| 2            | Request without valid key is rejected as unauthorised                         |
| 3            | Request with ID out of range fails as bad request                             |
| 4            | Request containing ID and valid key deletes order and returns success message |
| 5            | Request without valid key is rejected as unauthorised                         |
| 6            | Request with invalid order ID fails as bad request                            |
| 7            | Request with username and password returns API key                            |
| 8            | Request without username fails as server error                                |

### HW 10

| Scenario no. | Scenario description                                                         |
|--------------|------------------------------------------------------------------------------|
| 1            | Request with correctly formatted body returns 200 (Low risk)                 |
| 2            | Request with correctly formatted body returns 200 (Med risk)                 |
| 3            | Request with correctly formatted body returns 200 (Very High risk; rejected) |
| 4            | Request with negative debt returns 400 error                                 |
| 5            | Request with negative income returns 400 error                               |
| 6            | Request with age 5 returns 400 error                                         |