"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://shashank-techdomeloan.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(require("../routes/routes"));
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
app.on("error", (error) => console.log(`Server error: ${error}`));
