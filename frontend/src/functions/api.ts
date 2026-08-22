import { Conf, Food } from "./models";

export const API_PATH = 'http://127.0.0.1:8840';

const API_PATH_CONFIG = `${API_PATH}/api/config`;
const API_PATH_DATE   = `${API_PATH}/api/date`;
const API_PATH_FOOD   = `${API_PATH}/api/food`;
const API_PATH_ENTRY  = `${API_PATH}/api/entry`;

export const apiGetLinkRes = async (link:string) => {
  
  const res = await (await fetch(link)).json();

  return res;
};

export const apiGetConfig = async () => {
  
  const res = await (await fetch(API_PATH_CONFIG)).json();

  return res;
};

export const apiGetDate = async () => {
  
  const date = await (await fetch(API_PATH_DATE)).json();

  return date;
};

export const apiGetEntries = async (date:string) => {
  
  const entries = await (await fetch(`${API_PATH_ENTRY}/${date}`)).json();

  return entries;
};

export const apiGetFoods = async () => {
  
  const foods = await (await fetch(API_PATH_FOOD)).json();

  return foods;
};

export const apiDelEntry = async (id:number) => {

  await fetch(`${API_PATH_ENTRY}/${id}`, {
    method: "DELETE",
  });
};

export const apiDelFood = async (id:number) => {

  await fetch(`${API_PATH_FOOD}/${id}`, {
    method: "DELETE",
  });
};

export const apiAddEntry = async (entry: Food) => {

  await fetch(API_PATH_ENTRY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
};

export const apiAddFood = async (food: Food) => {

  await fetch(API_PATH_FOOD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });
};

export const apiAddConf = async (conf: Conf) => {
  
  await fetch(API_PATH_CONFIG, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conf),
  });
};