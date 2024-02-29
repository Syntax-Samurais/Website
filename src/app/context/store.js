"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

const ContextProps = {
  userId: "",
  setUserId: () => {},
};

const Context = createContext(null);
