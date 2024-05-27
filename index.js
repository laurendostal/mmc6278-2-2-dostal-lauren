const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      // TODO: Pull a random quote from the quotes.txt file
      const fileData = await fs.readFile (QUOTE_FILE, 'utf-8')
      const fileLines = fileData.split("\n").filter(removeBlankLines)
      const randomFileLineNumber = Math.floor(Math.random() * fileLines.length)
      const [quote, author] = fileLines[randomFileLineNumber].split("|")
      // console log the quote and author
      // You may style the text with chalk as you wish
      console.log(chalk.cyan('"' + quote + '"') + chalk.white.bold(' - ' + author))
    } catch (err) {
      console.log(err)
    }
    
  });

  function removeBlankLines (line) {
    if (line != '') {
      return line
    }
  }

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    try {
      if (!author || author.trim() == '') {
        author = "Anonymous"
      }
      const fileData = await fs.readFile (QUOTE_FILE, 'utf-8')
      const fileDataBlankLineRemoved = fileData.replaceAll("\n\n", "\n")
      const fileDataWithNewQuote = fileDataBlankLineRemoved + quote + "|" + author + "\n\n"
      await fs.writeFile(QUOTE_FILE , fileDataWithNewQuote)
      console.log(chalk.green.bold("The new quote was added."))
      } catch (err) {
        console.log(err)
      }
  });

program.parse();
