const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let BotOwner = data.BOTOWNER;
    let BanYetkili = data.BanYetkiliRol;
    
    if (!BanYetkili.some(x => message.member.roles.cache.has(x)) && !message.member.roles.cache.has(BotOwner)) return 
	message.reply({ embeds: [embed.setDescription(`__**Bot Owner Komutları**__\n\`.setup [help/bilgi/sıfırla]\n.namemode\n.tagmode\n.emoji kur\n.log\`\n__**Moderasyon Komutları**__\n\`.ban [@Relly/ID] (Sebep)\n.unban [@Relly/ID]\n.forceban [@Relly/ID] (Sebep)\n.banlist\n.jail [@Relly/ID] (Sebep)\n.unjail [@Relly/ID]\n.cmute [@Relly/ID] (Süre) (Sebep)\n.uncmute [@Relly/ID]\n.vmute [@Relly/ID] (Süre) (Sebep)\n.vunmute [@Relly/ID]\n.cezapuan [@Relly/ID]\n.cezasorgu [@Relly/ID]\n.sicil [@Relly/ID]\n.avatar\n.banner\n.rolkontrol\n.rolsüzver\n.urlkullanım\n.tagtarama [Tag]\n.git [@Relly/ID]\n.çek [@Relly/ID]\n.denetim [Rol/Kanal]\n.say\n.sil [Number]\n.n [@Relly/ID]\n.roldenetim [Rol/ID]\n.snipe\n.zengin (Name)\n.kilit\n.kontrol\n.yetkili\n.rollog\n.ysay [ROL]\n.rol [ROL]\n.ship\`\n__**Kayıt Komutları**__\n\`.erkek [@Relly/ID] (Name) (Age)\n.kız [@Relly/ID] (Name) (Age)\n.isim [@Relly/ID] (Name) (Age)\n.isimmod\n.isimler\n.setup\n.taglıalım\n.topteyit\n.kayıtsız [@Relly/ID]\n.vip [Relly/ID]\n.info (@Relly/ID)\`\n__**Invite Komutları**__\n\`.topinvites\n.invites [@Relly/ID]\``)] });
   
}

exports.config = {
    name: "yardım",
    usage: `${ayarlar.BotPrefix}yardım`,
    guildOnly: true,
    aliases: ["help"],
    cooldown: 3000
};
