import Menu from "./menu";
import User from "./user";
import Orders from "./orders";

export const { getWeeklyMenu, getTodaysMenu, getMenuByDay } = Menu;
export const { registerUser, loginUser, getUserData, changeUsersPassword } = User;
export const { createOrders, getPendingUserOrders, getCompletedUserOrders } = Orders;
