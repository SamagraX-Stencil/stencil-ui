'use client'
import { createContext } from 'react'

import { Theme } from '@mui/material/styles'
import { Color } from '../types/colorType'

export interface ThemeContextType2 {
  theme: Theme
  modifyTheme: (changes: Partial<Theme>) => void
  modifyPaletes: (paletes: Color) => void
}

export const ThemeContext = createContext<ThemeContextType2 | undefined>(
  undefined
)
