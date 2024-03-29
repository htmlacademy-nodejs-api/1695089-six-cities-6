import {Command} from './command.interface.js';
import chalk from 'chalk';
import {Commands} from './command.constants.js';


export class HelpCommand implements Command {
  public getName(): string {
    return Commands.help;
  }

  public async execute(..._parameters: string[]) {
    console.info(
      `
            ${chalk.blue(`
          Программа для подготовки данных для REST API сервера.

      Пример:
        cli.js --<command> [--arguments]

      Команды:
        --version:                   # выводит номер версии
        --help:                      # печатает этот текст
        --import <path>:             # импортирует данные из TSV
        --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `)}

    `);
  }
}
