import { DateTime } from 'luxon'

export const formatDateTimeClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('dd/MM/yyyy à HH:mm') : 'N/A'
export const formatTimeClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('HH:mm') : 'N/A'
export const formatDateServer = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('yyyy-MM-dd') : 'N/A'
export const formatDateClient = date => date ? DateTime.fromISO(date).setLocale('fr').toFormat('dd/MM/yyyy') : 'N/A'