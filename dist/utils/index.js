"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;
app.get('/', (_, res) => {
    res.status(200).send('caca2');
});
app.listen(process.env.PG_PORT, () => console.log(`Running on port ${process.env.PG_PORT}`));
app.use('/startchatbot', routes_1.default.start);
app.use('/recievemessage', routes_1.default.recieve);
// Start chatbot
// app.post('/users', (req, res) => {
//   // 1. validate phone number by calling phone_is_valid? method
//   //    if false: return 400 error
//   // 2. check if user exist
//   //    if yes: current_question_sequence = 1 & generate new interaction_id
//   //    if not: create new user
//   // 3. query questions table for the first question
//   // 4. commit db changes
//   //    if good: return question with a 200 response
//   //    if not: return 500 error
// })
// // Recieve message
// app.post('/answers', (req, res) => {
// // 1. call answer_is_valid? method
// //    if true: current_question ++ save_answer(answer)
// //    if false: 400 error response and return current question again
// })
//# sourceMappingURL=index.js.map