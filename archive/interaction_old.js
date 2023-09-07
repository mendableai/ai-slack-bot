// function splitInto(str, len) {
//     var regex = new RegExp(".{" + len + "}|.{1," + Number(len - 1) + "}", "g");
//     return str.match(regex);
//   }
// client.on('interactionCreate', async (interaction) => {
//     const channelId = interaction.channelId
//     const channel = client.channels.cache.get(channelId)

//       if (!interaction.isCommand()) return;

//       if (interaction.commandName === 'mendable') {
//       await interaction.deferReply()

//       const question = interaction.options.getString('question');

//       const response = await getAnswerAndSources(question)
//       const responseJSON = await response.json()

//       const answer = await responseJSON["answer"]["text"]
//       const sources = await responseJSON["sources"]

//       const parts = await splitInto(answer, 1999)

//       try {
//         if (sources != [] && sources != '') {
//           for (let i = 0; i < parts.length; i++) {
//             await channel.send(`${parts[i]}`)
//           }

//           await channel.send(sources)
//         } else {
//           for (let i = 0; i < parts.length; i++) {
//             await await channel.send(`${parts[i]}` )
//           }
//         }

//         interaction.editReply("Answered")
//       } catch (e) {
//         console.log(e)
//         await interaction.editReply({ content: `${e}` })
//       }
//       }
//   });
