import { logout } from "../../../../login/login-scripts";
const url = "http://localhost:8003/dailyStatistics/";


export const getAllFinancials = async (notification, navigator)=>{
    const response = await fetch(`${url}all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = [];
      if (response.status === 200) {
        data = await response.json();
      } else if (response.status === 401) {
        logout(notification, navigator);
      } else {
        notification.add("The server could not handle the request!", {
          variant: "error",
        });
      }
      return data;
}

export const createStatistic = async (notification, navigator, products)=>{
    const response = await fetch(`${url}create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
      credentials: "include",
    });
    if (response.status === 201) {
      notification.add("Statistic was added successfully!", {
        variant: "success",
      });
      navigator("/app/financial");
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else {
      notification.add("The server could not handle the request!", {
        variant: "error",
      });
    }
}

export const getProductionCost = async (notification, navigator)=>{
    const response = await fetch(`${url}productionCost`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = 0;
      if (response.status === 200) {
        data = await response.json();
      } else if (response.status === 401) {
        logout(notification, navigator);
      } else {
        notification.add("The server could not handle the request!", {
          variant: "error",
        });
      }
    return data;
}