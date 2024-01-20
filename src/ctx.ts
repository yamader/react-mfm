"use client" // wtf

import { createContext } from "react"

export const MfmConfigContext = createContext<{
  host?: string
}>({})

export const MfmConfigProvider = MfmConfigContext.Provider
