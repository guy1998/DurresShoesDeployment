import { logout } from "../../../../login/login-scripts";
const url = "http://localhost:8003/dailyStatistics/";

export const getAllFinancials = async (notification, navigator) => {
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
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
  }
  return data;
};

export const createStatistic = async (notification, navigator, products) => {
  const response = await fetch(`${url}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
    credentials: "include",
  });
  if (response.status === 201) {
    notification.add("La statistica è stata aggiunta con successo!", {
      variant: "success",
    });
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
  }
};

export const editStatistic = async (
  notification,
  navigator,
  products,
  statId
) => {
  const response = await fetch(`${url}edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products, statId }),
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("La statistica è stata aggiunta con successo!", {
      variant: "success",
    });
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
  }
};

export const getStatisticById = async (notification, navigator, statId) => {
  const response = await fetch(`${url}statistics/${statId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  let data = null;
  if (response.status === 200) {
    data = await response.json();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("La statistica non esiste!", {
      variant: "error",
    });
    navigator("/app/financial");
  }
  return data;
};

export const getProductionCost = async (notification, navigator) => {
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
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
  }
  return data;
};

export const deleteStat = async (
  notification,
  navigator,
  statId,
  dependency
) => {
  const response = await fetch(`${url}deleteById/${statId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("Eliminato con successo!", { variant: "success" });
    dependency(true);
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("La statistica non esiste!", {
      variant: "error",
    });
    navigator("/app/financial");
  }
};
