import fs from "fs/promises"
import { PATH_DB } from "../constants/path.js"

import chalk  from "chalk";

const logTotalPrice = async () => {
    

    try {
        const data = await fs.readFile(PATH_DB, "utf-8");
        const dataArray = JSON.parse(data);
        const totalPrice = dataArray.reduce((acc, {price}) => {
           return Number(price) + acc;
        }, 0)
console.log(chalk.green(`Total price is: ${totalPrice}`))
    } catch (error) {
        console.log(chalk.red(error))
    }
}
logTotalPrice()