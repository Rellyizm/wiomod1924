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
    let boostlevel = message.guild.premiumTier;

    message.channel.send({embeds: [embed.setDescription(`
    \`>\` Sunucuda toplam **${top}** adet üye var.
    \`>\` Toplamda **${tagges}** kişi tagımızı alarak bizi desteklemiş.
    \`>\` Şu anda toplam **${ses}** kişi seslide.`)]}) 

}
    exports.config = {
        name: "say",
        usage: `${ayarlar.BotPrefix}say`,
            guildOnly: true,
        aliases: ["say"],
        cooldown: 3000
    };