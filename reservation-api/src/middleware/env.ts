
import express from 'express'

export const DEFAULT_ADMIN: string = process.env.DEFAULT_ADMIN || "";
export const G_AUTH_ID="296938630298-cmbv8hsv7vn7nb78sv7t6uak1jpq1bop.apps.googleusercontent.com"
export const PORT: string | number = process.env.PORT || 5001;
export const ENV: string = process.env.NODE_ENV || "DEVELOPMENT";
export const MONGO_URL: string = process.env.MONGO_URL || "mongodb://localhost:27017/tradreservation";
export const REACT_APP_SHOW_BUILD: string = process.env.REACT_APP_SHOW_BUILD || "false";