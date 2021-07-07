const fs = require("fs")

let text = fs.readFileSync("./test.txt", { encoding: "utf-8" })

fs.writeFileSync(
	"./text_parsed.json",
	JSON.stringify(
		text.split("\n").map((e) => e.trim()),
		null,
		2
	)
)
