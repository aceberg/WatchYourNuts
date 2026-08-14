export const apiPath = 'http://127.0.0.1:8840';

export const apiGetConfig = async () => {
  const url = `${apiPath}/api/config`;
  const res = await (await fetch(url)).json();

  return res;
};

export const apiGetDate = async () => {
  const url = `${apiPath}/api/date`;
  const date = await (await fetch(url)).json();

  return date;
};

export const apiGetEntries = async (date:string) => {
  const url = `${apiPath}/api/entry/${date}`;
  const entries = await (await fetch(url)).json();

  return entries;
};

export const apiGetFoods = async () => {
  const url = `${apiPath}/api/food`;
  const foods = await (await fetch(url)).json();

  return foods;
};

export const apiDelEntry = async (id:number) => {

  await fetch(`${apiPath}/api/entry/${id}`, {
    method: "DELETE",
  });
};

export const apiDelFood = async (id:number) => {

  await fetch(`${apiPath}/api/food/${id}`, {
    method: "DELETE",
  });
};