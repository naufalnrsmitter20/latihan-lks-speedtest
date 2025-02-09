let messages = [];
let totalMessageSend = 0;
let totalMessageReceived = 0;
let totalCharactersendlength = 0;
let totalCharacterreceivedlength = 0;
let TextCharacterGroup = [];
async function getJsonFile() {
  const res = await fetch("./../result.json", {
    method: "GET",
  });
  const data = await res.json();
  messages = data.messages;
  console.log(messages);
  messages.map((message) => {
    if (message.from == "Budi") {
      totalMessageSend++;
      totalCharactersendlength += message.text.length;

      let words = message.text.toLowerCase().match(/\b\w+\b/g);
      words.forEach((word) => {
        if (TextCharacterGroup.length !== 0) {
          TextCharacterGroup[word]++;
        } else {
          TextCharacterGroup[word] = 1;
        }
      });
    } else if (message.from == "Bot") {
      totalMessageReceived++;
      totalCharacterreceivedlength += message.text.length;
    }
  });
  let avgCharacterSendLength = Math.floor(totalCharactersendlength / totalMessageSend);
  let avgCharacterReceivedLength = Math.floor(totalCharacterreceivedlength / totalMessageReceived);
  const sortedWords = Object.entries(TextCharacterGroup).sort((a, b) => b[1] - a[1]);
  const top5Words = sortedWords.slice(0, 5);
  console.log("Top 5 Sent Words:");
  top5Words.forEach(([word, count]) => {
    console.log(`${word} : ${count}`);
  });

  console.log("Total messages sent: " + totalMessageSend);
  console.log("Total messages received: " + totalMessageReceived);
  console.log("Average character length sent: " + avgCharacterSendLength);
  console.log("Average character length received: " + avgCharacterReceivedLength);
}
getJsonFile();
