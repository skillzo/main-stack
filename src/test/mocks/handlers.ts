import { http, HttpResponse } from "msw";

const BASE_URL = "https://fe-task-api.mainstack.io";

export const handlers = [
  http.get(`${BASE_URL}/user`, () => {
    return HttpResponse.json({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    });
  }),

  http.get(`${BASE_URL}/wallet`, () => {
    return HttpResponse.json({
      balance: 1000.5,
      total_payout: 5000.0,
      total_revenue: 7500.0,
      pending_payout: 250.75,
      ledger_balance: 1200.25,
    });
  }),

  http.get(`${BASE_URL}/transactions`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Payment from Customer",
        sender: "John Smith",
        amount: 150.0,
        date: "2024-01-15T10:30:00Z",
        status: "successful",
        type: "deposit",
      },
      {
        id: "2",
        title: "Refund to Customer",
        sender: "Jane Doe",
        amount: -75.5,
        date: "2024-01-14T14:20:00Z",
        status: "successful",
        type: "withdrawal",
      },
    ]);
  }),
];
