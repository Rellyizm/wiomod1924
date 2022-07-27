let mongoose = require("mongoose")
let sunucuayar = require("../Models/sunucuayar.js");
const ayarlar = require('../../Ayarlar.json')

module.exports.run = async(client, message, args, embed) => {    
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;

if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
    let top = message.guild.memberCount;
    let tagges = message.guild.members.cache.filter(s => data.TAG.some(a => s.user.tag.toLowerCase().includes(a))).size
    let ses = message.guild.members.cache.filter(s => s.voice.channel).size
    let boost = message.guild.premiumSubscriptionCount;
    let boostlevel = message.guild.premiumTier == "NONE" ? 0 : message.guild.premiumTier;
    let online = message.guild.members.cache.filter(s => s.presence?.status != "offline").size

    message.channel.send({embeds: [embed.setDescription(`
    ❯ Şuan da toplam **${ses}** kişi ses kanallarında aktif.
    ❯ Sunucu da şuan da toplam **${top}** üye var (**${online}** Aktif).
    ❯ Toplam **${tagges}** kişi tagımızı alarak bize destek oluyor. 
    ❯ Sunucumuz şuan da  **${boostlevel}** seviye ve **${boost}** boost basılmış.`)]}) 

}
    exports.config = {
        name: "say",
        usage: `${ayarlar.BotPrefix}say`,
            guildOnly: true,
        aliases: ["say"],
        cooldown: 3000
    };
