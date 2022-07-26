const ayarlar = require('../../Ayarlar.json')
const Discord = require("discord.js")
const Canvas = require("canvas")
let serverSettings = require("../Models/sunucuayar");

module.exports.run = async (client, message, args, embed) => {
    let server = await serverSettings.findOne({
        guildID: message.guild.id
    });
    if(!sunucu.SHIPKANAL.some(kanal => message.channel.id.includes(kanal))) return message.reply(`**UYARI:** Bu komutu yalnızca <#${sunucu.SHIPKANAL[0]}> kanalında kullanabilirsin!`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const sayı = Math.floor(Math.random() * 100);
    
    let mesaj;
    if(sayı > 89 && sayı < 101) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💖💖💖💖💖`
    if(sayı > 79 && sayı < 90) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💖💖💖💖💔`
    if(sayı > 69 && sayı < 80) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💖💖💖💔💔`
    if(sayı > 59 && sayı < 70) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💖💖💔💔💔`
    if(sayı > 49 && sayı < 60) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💖💔💔💔💔`
    if(sayı > 39 && sayı < 50) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💖💔💔💔💔💔`
    if(sayı > 29 && sayı < 40) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💖💔💔💔💔💔💔`
    if(sayı > 19 && sayı < 30) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💖💔💔💔💔💔💔💔`
    if(sayı > 9 && sayı < 20) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💖💔💔💔💔💔💔💔💔`
    if(sayı > 0 && sayı < 10) mesaj = `☁️${member} seni ${message.author} Çok mu seviyor? \n💟 **%${sayı}**\n💖💔💔💔💔💔💔💔💔💔`

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d")
    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/984393604762050580/984733114234445824/1774.png")
    ctx.drawImage(bg, 0, 0, 700, 250)
    ctx.font = "75px Sans-serif"
    ctx.fillStyle = "#f0f0f0"

    const messageAuthor = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png" }))
    ctx.drawImage(messageAuthor, 100, 25, 200, 200)

    const heart = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787002826762/zadekalp.png")
    const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787678093342/zadekirikkalp.png")
    const think = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949237394736037938/thnk.png")

    if(message.member.roles.cache.has(server.MAN[0])) {
       
    const member = message.guild.members.cache.filter(uye => uye.roles.cache.has(server.WOMAN[0])).random()

    const targetMention = await Canvas.loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(targetMention, 400, 25, 200, 200)



    if(sayı > 55 && sayı > 75) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 55 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 0 && sayı < 55) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return;
    }
} else if(message.member.roles.cache.has(server.WOMAN[0])) {
    const member = message.guild.members.cache.filter(uye => uye.roles.cache.has(server.MAN[0])).random()

    const targetMention = await Canvas.loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(targetMention, 400, 25, 200, 200)

    if(sayı > 55 && sayı > 75) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 55 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 0 && sayı < 55) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return;
    }
}

}

exports.config = {
    name: "ship",
    usage: `${ayarlar.BotPrefix}ship`,
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};











