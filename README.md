# HW-9 API TESTING

## TESTING SCENARIOS

| Method | Endpoint         | Scenario no. | +/- | Body/Params? | Expected res code |
|--------|------------------|--------------|-----|--------------|-------------------|
| PUT    | test-orders/{id} | 1            | +   | Body         | 200               |
| PUT    | test-orders/{id} | 2            | -   | Body         | 401               |
| PUT    | test-orders/{id} | 3            | -   | Body         | 400               |
| DELETE | test-orders/{id} | 4            | +   | Body         | 204               |
| DELETE | test-orders/{id} | 5            | -   | Body         | 401               |
| DELETE | test-orders/{id} | 6            | -   | Body         | 401               |
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
| 8            | Request without username fails as bad request                                 |