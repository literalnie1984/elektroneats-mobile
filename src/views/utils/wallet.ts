import { atom, selector } from "recoil";
import { FetchedClient } from "../../api/wallet/types";

export const walletAtom = atom<FetchedClient | null>({ key: "walletData", default: null });
export const walletSelector = selector({ key: "walletGet", get: ({ get }) => get(walletAtom) });

export const balanceAtom = atom<number | null>({ key: "balance", default: null });
export const balanceSelector = selector({ key: "balanceGet", get: ({ get }) => get(balanceAtom) });

export const verifyPostalIntegrity = (postal: string) => {
  if (postal.length !== 6) return false;
  else if (!postal.includes("-")) return false;

  const postalParts = postal.split("-");
  if (postalParts[0].length !== 2 || postalParts[1].length !== 3) return false;
  else if (Number.isNaN(postalParts[0]) && Number.isNaN(postalParts[1])) return false;

  return true;
};

export const verifyPhoneNumberIntegrity = (phoneNumber: string) => {
  if (phoneNumber.length !== 9) return false;
  return true;
};

export const verifyEmailAddressIntegrity = (email: string) => {
  if (!email.includes("@")) return false;

  const emailParts = email.split("@");

  if (!emailParts[1].includes(".")) return false;

  return true;
};

export const verifyNameIntegrity = (name: string) => {
  const nameParts = name.split(" ");
  if (nameParts.length !== 2) return false;
  if (typeof nameParts[0] !== "string") return false;

  return true;
};

export const parseFormToDetails = (form: any) => {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone_number,
    address: {
      city: form.city,
      country: form.country,
      state: form.region,
      postal_code: form.postal_code,
    },
  };
};
