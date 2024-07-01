"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_routes_1 = require("./routes/routes.routes");
const app = (0, express_1.default)();
const port = 3333;
app.use(routes_routes_1.routes);
app.get('/teste', (req, res) => {
    res.send('ola como estas');
});
app.listen(port, () => {
    console.log(`Rodando na porta : ${port}`);
});
