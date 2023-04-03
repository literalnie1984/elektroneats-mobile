import Menu from "./menu";
import User from "./user";
import Orders from "./orders";
import Wallet from "./wallet";

export const { getWeeklyMenu, getLastMenuUpdate } = Menu;
export const { registerUser, loginUser, getUserData, changeUsersPassword, verifyUser } = User;
export const { createOrders, getOrders } = Orders;
export const { getClientData, getBalance, setWallet, addBalance } = Wallet;
