const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionCollector, MessageEmbed } = require('discord.js');
const ayarlar = require('../../../Ayarlar.json')
const inviteSchema = require('../../models/invite');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Bot komutlarını gösteren yardım komutu!'),
    /**
     * 
     * @param {InteractionCollector} interaction 
     */
    async run(interaction) {
        let guildEmbed = new MessageEmbed().setColor('RANDOM').setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }).setFooter({ text: ayarlar.BotDurum });
        interaction.reply({
            embeds: [guildEmbed.setDescription(`__**Moderasyon Komutları**__\n\`.ban [@Relly/ID] (Sebep)\n.unban [@Relly/ID]\n.forceban [@Relly/ID] (Sebep)\n.banlist\n.jail [@Relly/ID] (Sebep)\n.unjail [@Relly/ID]\n.cmute [@Relly/ID] (Süre) (Sebep)\n.uncmute [@Relly/ID]\n.vmute [@Relly/ID] (Süre) (Sebep)\n.vunmute [@Relly/ID]\n.cezapuan [@Relly/ID]\n.cezasorgu [@Relly/ID]\n.sicil [@Relly/ID]\n.avatar\n.banner\n.rolkontrol\n.rolsüzver\n.urlkullanım\n.tagtarama [Tag]\n.git [@Relly/ID]\n.çek [@Relly/ID]\n.denetim [Rol/Kanal]\n.say\n.sil [Number]\n.n [@Relly/ID]\n.roldenetim [Rol/ID]\n.snipe\n.zengin (Name)\n.kilit\n.kontrol\n.rollog [@Relly/ID]\n.roomcreate\`\n__**Kayıt Komutları**__\n\`.erkek [@Relly/ID] (Name) (Age)\n.kız [@Relly/ID] (Name) (Age)\n.isim [@Relly/ID] (Name) (Age)\n.isimmod\n.isimler\n.setup\n.taglıalım\n.topteyit\n.kayıtsız [@Relly/ID]\n.vip [Relly/ID]\n.info (@Relly/ID)\`\n__**Stat Komutları**__\n\`.me\n.rolstat [@Relly/ID]\n.user [@Relly/ID]\n.top\`\n__**Invite Komutları**__\n\`.topinvites\n.invite [@Relly/ID]\n.bonus [@Relly/ID]\n.sıfırla [@Relly/ID]\``)], ephemeral: true
        });
    }
};