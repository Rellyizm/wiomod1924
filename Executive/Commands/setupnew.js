const Discord = require("discord.js")
const ayarlar = require('../../Ayarlar.json')
let sunucuayar = require("../Models/sunucuayar.js");

module.exports.run = async (client, message, args, embed) => {
  const sunucu = await sunucuayar.findOne({ guildID: client.guilds.cache.get(ayarlar.guildID) })
    const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setPlaceholder('Kuruluma Başla!')
          .setCustomId('kurulumselect')
          .addOptions([
          {
                label: "Kanal Kurumları Yap!",
                description: "Kanal Kurumları İçin Tıklayınız.",
                value: "kanalselect"
          },
          { 
              label: "Rol Kurulumları Yap!",
              description: "Rol Kurulumları İçin Tıklayınız.",
              value: "roleselect"
          },
          { 
            label: "Kategori Kurulumları Yap!",
            description: "Kategori Kurulumları İçin Tıklayınız.",
            value: "kategoriselect"
          },
          { 
            label: "Log Kurulumları Yap!",
            description: "Log Kurulumları İçin Tıklayınız.",
            value: "logselect"
          },
          { 
            label: "Emoji Kurulumları Yap!",
            description: "Rol Alma Kurulumları İçin Tıklayınız.",
            value: "emojıselect"
          }
          ])
      );
      if(!args[0]) {
        let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`
        ${message.author} Merhaba! ${message.guild.name} sunucusunun kurulum ekranına hoş geldiniz! 
        Bu menüde botunuzun tüm ayarlarını gerçekleştire bilirsiniz.
        Sunucu ayarları, emojiler, log kanalları ve daha bir sürü işlemi bu menü üzerinden hızlıca ve kolayca gerçekleştire bilirsiniz.
        `).setFooter(`Menüden Kurulum Seçiniz!`)] })
      
      
        msg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
  if(interaction.values[0] == "kanalselect") {
      if(msg) msg.delete();
    const krow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setPlaceholder('Detaylı Bilgi!')
          .setCustomId('kanalokeymenu')
          .addOptions([
            {
                label: "Kanal Kurumlarını Gör!",
                description: "Tüm Kurulumu Bitirmeden Açmayınız!",
                value: "kanalokey"
            },
            {
                label: "Kapat!",
                description: "Kapat!",
                value: "kkapat"
          }
        ]),
      );
  
      let kmsg = await interaction.channel.send({ components: [krow], embeds: [embed.setFooter(`${ayarlar.altbaslik}`).setDescription(`
   ${message.guild.name} **Kanal Kurulum Ekranı**
  \`\`\`Sunucu İçi Log Kanal Ayarları\`\`\`Ban Log \`(.kanallar banlog #Kanal/ID)\`
  Jail Log \`(.kanallar jaillog #Kanal/ID)\`
  Mute Log \`(.kanallar mutelog #Kanal/ID)\` 
  Tag Log \`(.kanallar taglog #Kanal/ID)\` 
  Denetim Log \`(.kanallar denetimlog #Kanal/ID)\` 
  Mesaj Log \`(.kanallar mesajlog #Kanal/ID)\`
  Ses Log \`(.kanallar seslog #Kanal/ID)\`
  Invite Log \`(.kanallar invitelog #Kanal/ID)\`
  Ceza Puan Log \`(.kanallar cezaplog #Kanal/ID)\` 
  Rol Log \`(.kanallar rollog #Kanal/ID)\`
  \`\`\`Sunucu İçi Kanal Ayarları\`\`\`
  Genel Sohbet \`(.kanallar genelsohbet #Kanal/ID)\`
  Teyit Kanalı \`(.kanallar teyitkanali #Kanal/ID)\`
  Reward Log Kanal \`(.kanallar rewardlog #Kanal/ID)\`
  `)]})
  
  kmsg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
    if(interaction.values[0] === "kanalokey") {
        if(kmsg) kmsg.delete()
        let banlog = sunucu.BANLOG ? `<#${sunucu.BANLOG}>` : `${ayarlar.red}`
        let jaillog = sunucu.JAILLOG ? `<#${sunucu.JAILLOG}>` : `${ayarlar.red}`
        let mutelog = sunucu.CMUTELOG ? `<#${sunucu.CMUTELOG}>` : `${ayarlar.red}`
        let taglog = sunucu.TAGLOG ? `<#${sunucu.TAGLOG}>` : `${ayarlar.red}`
        let mesajlog = sunucu.MESSAGELOG ? `<#${sunucu.MESSAGELOG}>` : `${ayarlar.red}`
        let seslog = sunucu.VOICELOG ? `<#${sunucu.VOICELOG}>` : `${ayarlar.red}`
        let genelsohbet = sunucu.CHAT ? `<#${sunucu.CHAT}>` : `${ayarlar.red}`
        let giriskanal = sunucu.REGISTER ? `<#${sunucu.REGISTER}>` : `${ayarlar.red}`
        let invitelog = sunucu.INVITEChannel ? `<#${sunucu.INVITEChannel}>` : `${ayarlar.red}`
        let cezapLog = sunucu.CEZAPUANLOG ? `<#${sunucu.CEZAPUANLOG}>` : `${ayarlar.red}`
        let rolLog = sunucu.ROLLOG ? `<#${sunucu.ROLLOG}>` : `${ayarlar.red}`

  
        interaction.channel.send({ embeds: [embed.setDescription(`
   ${message.guild.name} **Kanal Kontrol Ekranı**
  \`\`\`Sunucu İçi Log Kanal Ayarları\`\`\`Ban Log \`(.kanallar banlog #Kanal/ID)\` : ${banlog}
  Jail Log \`(.kanallar jaillog #Kanal/ID)\` : ${jaillog}
  Mute Log \`(.kanallar mutelog #Kanal/ID)\` : ${mutelog}
  Tag Log \`(.kanallar taglog #Kanal/ID)\` : ${taglog}
  Mesaj Log \`(.kanallar mesajlog #Kanal/ID)\` : ${mesajlog}
  Ses Log \`(.kanallar seslog #Kanal/ID)\` : ${seslog}
  Invite Log \`(.kanallar invitelog #Kanal/ID)\` : ${invitelog}
  Ceza Puan Log \`(.kanallar cezaplog #Kanal/ID)\` : ${cezapLog}
  Rol Log \`(.kanallar rollog #Kanal/ID)\` : ${rolLog}
  \`\`\`Sunucu İçi Kanal Ayarları\`\`\`
  Genel Sohbet \`(.kanallar genelsohbet #Kanal/ID)\` : ${genelsohbet}
  Teyit Kanalı \`(.kanallar teyitkanali #Kanal/ID)\` : ${giriskanal}
  `)]})
    }
    if(interaction.values[0] === "kkapat") {
        if(kmsg) kmsg.delete();
    }
  })
  }
  if(interaction.values[0] === "roleselect") {
      if(msg) msg.delete();
    const rrow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setPlaceholder('Detaylı Bilgi!')
          .setCustomId('rolokeymenu')
          .addOptions([
              {
                label: "Rol Kurumlarını Gör!",
                description: "Tüm Kurulumu Bitirmeden Açmayınız!",
                value: "rolokey"
              },
              {
                label: "Kapat!",
                description: "Kapat!",
                value: "rkapat"
              }
        ]),
      );
  
      
      let rmsg = await interaction.channel.send({ components: [rrow], embeds: [embed.setDescription(`
   ${message.guild.name} **Rol Kurulum Ekranı**
  \`\`\`Hammer Rol Ayarları\`\`\`Ban Hammer Rolleri \`(.roller banhammer @Rol/ID)\`  
  Jail Hammer Rolleri \`(.roller jailhammer @Rol/ID)\` 
  Mute Hammer Rolleri \`(.roller mutehammer @Rol/ID)\`  
  Voice Mute Hammer Rolleri \`(.roller vmutehammer @Rol/ID)\`  
  Clown Hammer Rolleri \`(.roller clownhammer @Rol/ID)\` 
  Move Hammer Rolleri \`(.roller movehammer @Rol/ID)\`
  Register Hammer Rolleri \`(.roller registerhammer @Rol/ID)\` 
  \`\`\`Sunucu İçi Rol Ayarları\`\`\`Vip Rolü \`(.roller viprol @Rol/ID)\`
  Erkek Rolleri \`(.roller erkekrol @Rol/ID)\` 
  Kadın Rolleri \`(.roller kadınrol @Rol/ID)\` 
  Yönetim Rolleri \`(.roller yonetimrolleri @Rol/ID)\` 
  Kayıtsız Rolü \`(.roller kayıtsızrol @Rol/ID)\` 
  Taglı Rolü \`(.roller tagrol @Rol/ID)\` 
  Booster Rolü \`(.roller boosterrol @Rol/ID)\`
  Etkinlik Rolü \`(.roller etkinlikrol @Rol/ID)\` 
  Çekiliş Rolü \`(.roller cekilisrol @Rol/ID)\` 
  \`\`\`Cezalı Rol Ayarları\`\`\`Muted Rolü\`(.roller muterol @Rol/ID)\` 
  V Muted Rolü \`(.roller vmuterol @Rol/ID)\`
  Cezalı Rolü \`(.roller cezalırol @Rol/ID)\`
  Başvuru Cezalı Rolü \`(.roller basvurucezali @Rol/ID)\`
  Yekili Alım DM Rolü \`(.roller yetkilialimdm @Rol/ID)\`
  En Alt Yetki Rolü \`(.roller enaltyetki @Rol/ID)\`
  Yeni Hesap Rolü \`(.roller yenihesaprol @Rol/ID)\`
  Yasaklı Tag Rolü \`(.roller ytagrol @Rol/ID)\`
  \`\`\`Reward Rol Ayarları\`\`\`Chat Bronz Rolü\`(.roller cbronz @Rol/ID)\` 
  Chat Gümüş Rolü\`(.roller cgumus @Rol/ID)\` 
  Chat Altın Rolü\`(.roller caltın @Rol/ID)\` 
  Chat Elmas Rolü\`(.roller celmas @Rol/ID)\`
  Voice Bronz Rolü\`(.roller vbronz @Rol/ID)\`  
  Voice Gümüş Rolü\`(.roller vgumus @Rol/ID)\`
  Voice Altın Rolü\`(.roller valtin @Rol/ID)\`  
  Voice Elmas Rolü\`(.roller velmas @Rol/ID)\`  
  `).setFooter(`Kurulumları görmek için menüden seçiniz!`)]})
  
  rmsg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
    if(interaction.values[0] === "rolokey") {
        if(rmsg) rmsg.delete()
        let banhammer = sunucu.banHammer ? `<@&${sunucu.banHammer}>` : `${ayarlar.red}`
        let jailhammer = sunucu.jailHammer ? `<@&${sunucu.jailHammer}>` : `${ayarlar.red}`
        let mutehammer = sunucu.muteHammer ? `<@&${sunucu.muteHammer}>` : `${ayarlar.red}`
        let vmutehammer = sunucu.vmuteHammer ? `<@&${sunucu.vmuteHammer}>` : `${ayarlar.red}`
        let clownhammer = sunucu.clownHammer ? `<@&${sunucu.clownHammer}>` : `${ayarlar.red}`
        let movehammer = sunucu.moveHammer ? `<@&${sunucu.moveHammer}>` : `${ayarlar.red}`
        let registerhammer = sunucu.registerHammer ? `<@&${sunucu.registerHammer}>` : `${ayarlar.red}`
        let viprol = sunucu.vipRol ? `<@&${sunucu.vipRol}>` : `${ayarlar.red}`
        let erkekrol = sunucu.erkek ? `${sunucu.erkek.length > 1 ? sunucu.erkek.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + sunucu.erkek.map(x => `<@&${x}>`).slice(-1) : sunucu.erkek.map(x => `<@&${x}>`).join("")}` : `${ayarlar.red}`
        let kadınrol = sunucu.kadın ? `${sunucu.kadın.length > 1 ? sunucu.kadın.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + sunucu.kadın.map(x => `<@&${x}>`).slice(-1) : sunucu.kadın.map(x => `<@&${x}>`).join("")}` : `${ayarlar.red}`
        let yonetimRoles = sunucu.yonetimRoles ? `${sunucu.yonetimRoles.length > 1 ? sunucu.yonetimRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + sunucu.yonetimRoles.map(x => `<@&${x}>`).slice(-1) : sunucu.yonetimRoles.map(x => `<@&${x}>`).join("")}` : `${ayarlar.red}`
        let kayitsizrol = sunucu.kayıtsızRol ? `<@&${sunucu.kayıtsızRol}>` : `${ayarlar.red}`
        let tagrol = sunucu.tagRol ? `<@&${sunucu.tagRol}>` : `${ayarlar.red}`
        let mutedrol = sunucu.mutedRol ? `<@&${sunucu.mutedRol}>` : `${ayarlar.red}`
        let vmutedrol = sunucu.vmutedRol ? `<@&${sunucu.vmutedRol}>` : `${ayarlar.red}`
        let cezalıRol = sunucu.cezalıRol ? `<@&${sunucu.cezalıRol}>` : `${ayarlar.red}`
        let ytagrol = sunucu.yasakTagRol ? `<@&${sunucu.yasakTagRol}>` : `${ayarlar.red}`
        let boosterRol = sunucu.boosterRol ? `<@&${sunucu.boosterRol}>` : `${ayarlar.red}`
        let cekilisrol = sunucu.cekilisRole ? `<@&${sunucu.cekilisRole}>` : `${ayarlar.red}`
        let etkinlikrol = sunucu.etkinlikRole ? `<@&${sunucu.etkinlikRole}>` : `${ayarlar.red}`
  
        let basvurucezali = sunucu.basvuruCezali ? `<@&${sunucu.basvuruCezali}>` : `${ayarlar.red}`
        let yetkilialimdm = sunucu.yetkiliAlımDM ? `<@&${sunucu.yetkiliAlımDM}>` : `${ayarlar.red}`
        let enaltyetki = sunucu.enAltYetki ? `<@&${sunucu.enAltYetki}>` : `${ayarlar.red}`
        let yenihesap = sunucu.yeniHesapRol ? `<@&${sunucu.yeniHesapRol}>` : `${ayarlar.red}`
        let cbronz = sunucu.cBronz ? `<@&${sunucu.cBronz}>` : `${ayarlar.red}`
        let cgumus = sunucu.cGumus ? `<@&${sunucu.cGumus}>` : `${ayarlar.red}`
        let caltin = sunucu.cAltin ? `<@&${sunucu.cAltin}>` : `${ayarlar.red}`
        let celmas = sunucu.cElmas ? `<@&${sunucu.cElmas}>` : `${ayarlar.red}`
        let vbronz = sunucu.vBronz ? `<@&${sunucu.vBronz}>` : `${ayarlar.red}`
        let vgumus = sunucu.vGumus ? `<@&${sunucu.vGumus}>` : `${ayarlar.red}`
        let valtin = sunucu.vAltin ? `<@&${sunucu.vAltin}>` : `${ayarlar.red}`
        let velmas = sunucu.vElmas ? `<@&${sunucu.vElmas}>` : `${ayarlar.red}`
  
        await interaction.channel.send({ embeds: [embed.setDescription(`
   ${message.guild.name} **Rol Kontrol Ekranı**
  \`\`\`Hammer Rol Ayarları\`\`\`Ban Hammer Rolleri \`(.roller banhammer @Rol/ID)\` : ${banhammer}  
  Jail Hammer Rolleri \`(.roller jailhammer @Rol/ID)\` : ${jailhammer}  
  Mute Hammer Rolleri \`(.roller mutehammer @Rol/ID)\` : ${mutehammer}  
  Voice Mute Hammer Rolleri \`(.roller vmutehammer @Rol/ID)\` : ${vmutehammer}  
  Clown Hammer Rolleri \`(.roller clownhammer @Rol/ID)\` : ${clownhammer}  
  Move Hammer Rolleri \`(.roller movehammer @Rol/ID)\` : ${movehammer}  
  Register Hammer Rolleri \`(.roller registerhammer @Rol/ID)\` : ${registerhammer}
  \`\`\`Sunucu İçi Rol Ayarları\`\`\`Vip Rolü \`(.roller viprol @Rol/ID)\` : ${viprol}  
  Erkek Rolleri \`(.roller erkekrol @Rol/ID)\` : ${erkekrol}
  Kadın Rolleri \`(.roller kadınrol @Rol/ID)\` : ${kadınrol}
  Yönetim Rolleri \`(.roller yonetimrolleri @Rol/ID)\` : ${yonetimRoles}
  Kayıtsız Rolü \`(.roller kayıtsızrol @Rol/ID)\` : ${kayitsizrol}
  Taglı Rolü \`(.roller tagrol @Rol/ID)\` : ${tagrol}
  Booster Rolü \`(.roller boosterrol @Rol/ID)\` : ${boosterRol}
  Etkinlik Rolü \`(.roller etkinlikrol @Rol/ID)\` : ${etkinlikrol}
  Çekiliş Rolü \`(.roller cekilisrol @Rol/ID)\` : ${cekilisrol}
  \`\`\`Cezalı Rol Ayarları\`\`\`Muted Rolü\`(.roller muterol @Rol/ID)\` : ${mutedrol}
  V Muted Rolü \`(.roller vmuterol @Rol/ID)\` : ${vmutedrol}
  Cezalı Rolü \`(.roller cezalırol @Rol/ID)\` : ${cezalıRol}
  Yasaklı Tag Rolü \`(.roller ytagrol @Rol/ID)\` : ${ytagrol}
  Başvuru Cezalı Rolü \`(.roller basvurucezali @Rol/ID)\` : ${basvurucezali}
  Yekili Alım DM Rolü \`(.roller yetkilialimdm @Rol/ID)\` : ${yetkilialimdm}
  En Alt Yetki Rolü \`(.roller enaltyetki @Rol/ID)\` : ${enaltyetki}
  Yeni Hesap Rolü \`(.roller yenihesaprol @Rol/ID)\` : ${yenihesap}
  \`\`\`Reward Rol Ayarları\`\`\`Chat Bronz Rolü\`(.roller cbronz @Rol/ID)\` : ${cbronz}
  Chat Gümüş Rolü\`(.roller cgumus @Rol/ID)\` : ${cgumus}
  Chat Altın Rolü\`(.roller caltın @Rol/ID)\` : ${caltin}
  Chat Elmas Rolü\`(.roller celmas @Rol/ID)\` : ${celmas}
  Voice Bronz Rolü\`(.roller vbronz @Rol/ID)\` : ${vbronz}
  Voice Gümüş Rolü\`(.roller vgumus @Rol/ID)\` : ${vgumus}
  Voice Altın Rolü\`(.roller valtin @Rol/ID)\` : ${valtin}
  Voice Elmas Rolü\`(.roller velmas @Rol/ID)\` : ${velmas}
  `)]})
    }
    if(interaction.values[0] === "rkapat") {
        if(rmsg) rmsg.delete()
    }
  })
  }
  if(interaction.values[0] === "kategoriselect") {
    if(msg) msg.delete();
    const crow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setPlaceholder('Detaylı Bilgi!')
          .setCustomId('kategoriokeymenu')
          .addOptions([
              {
                label: "Kategori Kurumlarını Gör!",
                description: "Tüm Kurulumu Bitirmeden Açmayınız!",
                value: "kategoriokey"
              },
              {
                label: "Kapat!",
                description: "Kapat!",
                value: "ckapat"
              }
        ]),
      );
  
      let cmsg = await interaction.channel.send({ components: [crow], embeds: [embed.setDescription(`
   ${message.guild.name} **Kategori Kurulum Ekranı**
  \`\`\`Kategori Ayarları\`\`\`Başvuru Kategorisi \`(.kategori basvurukat <ID>)\`  
  Public Kategorileri \`(.kategori publickat <ID>)\` 
  Register Kategorileri \`(.kategori registerkat <ID>)\` 
  Private Kategorileri \`(.kategori privatekat <ID>)\` 
  Oyun Kategorileri \`(.kategori oyunkat <ID>)\` 
  `)]})
  cmsg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
    if(interaction.values[0] === "kategoriokey") {
  
        let basvuruk = sunucu.basvuruKategori ? `<#${sunucu.basvuruKategori}>` : `${ayarlar.red}`
        let publick = sunucu.publicParents ? `${sunucu.publicParents.length > 1 ? sunucu.publicParents.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + sunucu.publicParents.map(x => `<#${x}>`).slice(-1) : sunucu.publicParents.map(x => `<#${x}>`).join("")}` : `${ayarlar.red}`
        let registerk = sunucu.regParents ? `${sunucu.regParents.length > 1 ? sunucu.regParents.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + sunucu.regParents.map(x => `<#${x}>`).slice(-1) : sunucu.regParents.map(x => `<#${x}>`).join("")}` : `${ayarlar.red}`
        let privk = sunucu.privateParents ? `${sunucu.privateParents.length > 1 ? sunucu.privateParents.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + sunucu.privateParents.map(x => `<#${x}>`).slice(-1) : sunucu.privateParents.map(x => `<#${x}>`).join("")}` : `${ayarlar.red}`
        let gamek = sunucu.gameParents ? `${sunucu.gameParents.length > 1 ? sunucu.gameParents.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + sunucu.gameParents.map(x => `<#${x}>`).slice(-1) : sunucu.gameParents.map(x => `<#${x}>`).join("")}` : `${ayarlar.red}`
  
        if(cmsg) cmsg.delete();
        await interaction.channel.send({ embeds: [embed.setDescription(`
   ${message.guild.name} **Kategori Kontrol Ekranı**
  \`\`\`Kategori Ayarları\`\`\`Başvuru Kategorisi \`(.kategori basvurukat @Rol/ID)\` : ${basvuruk}  
  Public Kategorileri \`(.kategori publickat <ID>)\` : ${publick}
  Register Kategorileri \`(.kategori registerkat <ID>)\` : ${registerk}
  Private Kategorileri \`(.kategori privatekat <ID>)\` : ${privk}
  Oyun Kategorileri \`(.kategori oyunkat <ID>)\` : ${gamek}
  `)]})
  
    }
    if(interaction.values[0] === "ckapat") {
        if(rmsg) rmsg.delete()
    }
  })
  }
  if(interaction.values[0] === "marketselect") {
    if(msg) msg.delete();
    const crow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setPlaceholder('Detaylı Bilgi!')
          .setCustomId('marketokeymenu')
          .addOptions([
              {
                label: "Market Kurumlarını Gör!",
                description: "Tüm Kurulumu Bitirmeden Açmayınız!",
                value: "marketokey"
              },
              {
                label: "Kapat!",
                description: "Kapat!",
                value: "mkapat"
              }
        ]),
      );
  
      let cmsg = await interaction.channel.send({ components: [crow], embeds: [embed.setFooter(`Oto Kurulum İçin .kur`).setDescription(`
   ${message.guild.name} **Market Kurulum Ekranı**
  \`\`\`Market Ayarları\`\`\`Market Kategorisi \`(.kategori marketkat <ID>)\`  
  Market Bilgi \`(.kanallar marketbilgi <ID>)\` 
  Market Log \`(.kanallar marketlog <ID>)\`
  Market Kanıt \`(.kanallar marketkanıt <ID>)\`
  Market Komut Kanalları \`(.kanallar marketkomut <ID>)\` 
  `)]})
  cmsg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
    if(interaction.values[0] === "marketokey") {
  
        let marketk = sunucu.basvuruKategori ? `<#${sunucu.marketKategori}>` : `${ayarlar.red}`
        let mbilgi = sunucu.marketBilgi ? `<#${sunucu.marketBilgi}>` : `${ayarlar.red}`
        let marketlog = sunucu.marketLog ? `<#${sunucu.marketLog}>` : `${ayarlar.red}`
        let mkanit = sunucu.marketKanit ? `<#${sunucu.marketKanit}>` : `${ayarlar.red}`
        let marketkomut = sunucu.marketKomut ? `${sunucu.marketKomut.length > 1 ? sunucu.marketKomut.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + sunucu.marketKomut.map(x => `<#${x}>`).slice(-1) : sunucu.marketKomut.map(x => `<#${x}>`).join("")}` : `${ayarlar.red}`
  
        if(cmsg) cmsg.delete();
        await interaction.channel.send({ embeds: [embed.setDescription(`
   ${message.guild.name} **Kategori Kontrol Ekranı**
  \`\`\`Kategori Ayarları\`\`\`Başvuru Kategorisi \`(.kategori basvurukat @Rol/ID)\` : ${marketk}  
  Market Bilgi \`(.kanallar marketbilgi <ID>)\` : ${mbilgi}
  Market Log \`(.kanallar marketlog <ID>)\` : ${marketlog}
  Market Kanıt \`(.kanallar marketkanıt <ID>)\` : ${mkanit}
  Market Komut Kanalları \`(.kanallar marketkomut <ID>)\` : ${marketkomut}
  `)]})
  
    }
    if(interaction.values[0] === "ckapat") {
        if(rmsg) rmsg.delete()
    }
  })
  }
  if(interaction.values[0] == "rolalmaselect") {
    if(msg) msg.delete();
  const krow = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setPlaceholder('Detaylı Bilgi!')
        .setCustomId('rolalmaokeymenu')
        .addOptions([
          {
              label: "Rol Alma Kurumlarını Gör!",
              description: "Tüm Kurulumu Bitirmeden Açmayınız!",
              value: "rolalmaokey"
          },
          {
              label: "Kapat!",
              description: "Kapat!",
              value: "rakapat"
        }
      ]),
    );
  
    let ramsg = await interaction.channel.send({ components: [krow], embeds: [embed.setFooter(`${ayarlar.altbaslik}`).setDescription(`
   ${message.guild.name} **Rol Alma Kurulum Kontrol Ekranı**
  \`\`\`Sunucu İçi Renk Rol Alma Ayarları\`\`\`Kırmızı Renk \`(.roller kirmizirenk @Rol/ID)\` 
  Turuncu Renk \`(.roller turuncurenk @Rol/ID)\` 
  Mavi Renk \`(.roller mavirenk @Rol/ID)\` 
  Lila Renk \`(.roller lilarenk @Rol/ID)\` 
  Mor Renk \`(.roller morrenk @Rol/ID)\` 
  Pembe Renk \`(.roller pemberenk @Rol/ID)\` 
  Yeşil Renk \`(.roller yesilrenk @Rol/ID)\`
  \`\`\`Sunucu İçi İlişki Rol Alma Ayarları\`\`\`Sevgilim Var \`(.roller sevgilimvar @Rol/ID)\` 
  Sevgilim Yok \`(.roller sevgilimyok @Rol/ID)\`
  \`\`\`Sunucu İçi Burç Rol Alma Ayarları\`\`\`Koç Burcu \`(.roller koc @Rol/ID)\` 
  Boğa Burcu \`(.roller boga @Rol/ID)\` 
  İkizler Burcu \`(.roller ikizler @Rol/ID)\` 
  Yengeç Burcu \`(.roller yengec @Rol/ID)\` 
  Aslan Burcu \`(.roller aslan @Rol/ID)\` 
  Başak Burcu \`(.roller basak @Rol/ID)\` 
  Terazi Burcu \`(.roller terazi @Rol/ID)\` 
  Akrep Burcu \`(.roller akrep @Rol/ID)\` 
  Yay Burcu \`(.roller yay @Rol/ID)\` 
  Oğlak Burcu \`(.roller oglak @Rol/ID)\` 
  Kova Burcu \`(.roller kova @Rol/ID)\` 
  Balık Burcu \`(.roller balik @Rol/ID)\` 
  \`\`\`Sunucu İçi Rol Alma Kanal Ayarları\`\`\`Rol Alma Kanal Ayarı \`(.kanallar rolalmakanal #Kanal/ID)\` 
  `)]})
  
  ramsg
  .awaitMessageComponent({
  filter: (component) => component.user.id === message.author.id,
  componentType: 'SELECT_MENU',
  })
  .then(async (interaction) => {
  if(interaction.values[0] === "rolalmaokey") {
      if(ramsg) ramsg.delete()
  
      let kirmizi = sunucu.kirmiziRenk ? `<@&${sunucu.kirmiziRenk}>` : `${ayarlar.red}`
      let turuncu = sunucu.turuncuRenk ? `<@&${sunucu.turuncuRenk}>` : `${ayarlar.red}`
      let mavi = sunucu.maviRenk ? `<@&${sunucu.maviRenk}>` : `${ayarlar.red}`
      let lila = sunucu.lilaRenk ? `<@&${sunucu.lilaRenk}>` : `${ayarlar.red}`
      let mor = sunucu.morRenk ? `<@&${sunucu.morRenk}>` : `${ayarlar.red}`
      let pembe = sunucu.pembeRenk ? `<@&${sunucu.pembeRenk}>` : `${ayarlar.red}`
      let yesil = sunucu.yesilRenk ? `<@&${sunucu.yesilRenk}>` : `${ayarlar.red}`
  
      let sevgilimvar = sunucu.couple ? `<@&${sunucu.couple}>` : `${ayarlar.red}`
      let sevgilimyok = sunucu.alone ? `<@&${sunucu.alone}>` : `${ayarlar.red}`
  
      let koc = sunucu.koc ? `<@&${sunucu.koc}>` : `${ayarlar.red}`
      let boga = sunucu.boga ? `<@&${sunucu.boga}>` : `${ayarlar.red}`
      let ikizler = sunucu.ikizler ? `<@&${sunucu.ikizler}>` : `${ayarlar.red}`
      let yengec = sunucu.yengec ? `<@&${sunucu.yengec}>` : `${ayarlar.red}`
      let aslan = sunucu.aslan ? `<@&${sunucu.aslan}>` : `${ayarlar.red}`
      let basak = sunucu.basak ? `<@&${sunucu.basak}>` : `${ayarlar.red}`
      let terazi = sunucu.terazi ? `<@&${sunucu.terazi}>` : `${ayarlar.red}`
      let akrep = sunucu.akrep ? `<@&${sunucu.akrep}>` : `${ayarlar.red}`
      let yay = sunucu.yay ? `<@&${sunucu.yay}>` : `${ayarlar.red}`
      let oglak = sunucu.oglak ? `<@&${sunucu.oglak}>` : `${ayarlar.red}`
      let kova = sunucu.kova ? `<@&${sunucu.kova}>` : `${ayarlar.red}`
      let balik = sunucu.balik ? `<@&${sunucu.balik}>` : `${ayarlar.red}`
  
      let rolAlmaKanal = sunucu.rolAlmaKanal ? `<#${sunucu.rolAlmaKanal}>` : `${ayarlar.red}`
  
  
      interaction.channel.send({ embeds: [embed.setDescription(`
   ${message.guild.name} **Rol Alma Kurulum Kontrol Ekranı**
  \`\`\`Sunucu İçi Renk Rol Alma Ayarları\`\`\`Kırmızı Renk \`(.roller kirmizirenk @Rol/ID)\` : ${kirmizi}
  Turuncu Renk \`(.roller turuncurenk @Rol/ID)\` : ${turuncu}
  Mavi Renk \`(.roller mavirenk @Rol/ID)\` : ${mavi}
  Lila Renk \`(.roller lilarenk @Rol/ID)\` : ${lila}
  Mor Renk \`(.roller morrenk @Rol/ID)\` : ${mor}
  Pembe Renk \`(.roller pemberenk @Rol/ID)\` : ${pembe}
  Yeşil Renk \`(.roller yesilrenk @Rol/ID)\` : ${yesil}
  \`\`\`Sunucu İçi İlişki Rol Alma Ayarları\`\`\`Sevgilim Var \`(.roller sevgilimvar @Rol/ID)\` : ${sevgilimvar}
  Sevgilim Yok \`(.roller sevgilimyok @Rol/ID)\` : ${sevgilimyok}
  \`\`\`Sunucu İçi Burç Rol Alma Ayarları\`\`\`Koç Burcu \`(.roller koc @Rol/ID)\` : ${koc}
  Boğa Burcu \`(.roller boga @Rol/ID)\` : ${boga}
  İkizler Burcu \`(.roller ikizler @Rol/ID)\` : ${ikizler}
  Yengeç Burcu \`(.roller yengec @Rol/ID)\` : ${yengec}
  Aslan Burcu \`(.roller aslan @Rol/ID)\` : ${aslan}
  Başak Burcu \`(.roller basak @Rol/ID)\` : ${basak}
  Terazi Burcu \`(.roller terazi @Rol/ID)\` : ${terazi}
  Akrep Burcu \`(.roller akrep @Rol/ID)\` : ${akrep}
  Yay Burcu \`(.roller yay @Rol/ID)\` : ${yay}
  Oğlak Burcu \`(.roller oglak @Rol/ID)\` : ${oglak}
  Kova Burcu \`(.roller kova @Rol/ID)\` : ${kova}
  Balık Burcu \`(.roller balik @Rol/ID)\` : ${balik}
  \`\`\`Sunucu İçi Rol Alma Kanal Ayarları\`\`\`Rol Alma Kanal Ayarı \`(.kanallar rolalmakanal #Kanal/ID)\` : ${rolAlmaKanal}
  `)]})
  }
  if(interaction.values[0] === "kkapat") {
      if(ramsg) ramsg.delete();
  }
  })
  }
  })
  return }
  
  // -------------------------KANAL AYARLAMA------------------------//
  if(args[0] === "banlog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { banLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Ban Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "jaillog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { jailLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Jail Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "mutelog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { muteLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Mute Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "taglog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { tagLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Tag Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  
  if(args[0] === "mesajlog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { messageLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Mesaj Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "seslog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { voiceLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }


 
  if(args[0] === "genelsohbet") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { genelChat: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Chat\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "teyitkanali") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { registerChannel: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Teyit\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "invitelog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { inviteLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Invite Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "cezaplog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cezapLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Ceza Puan Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  if(args[0] === "rollog") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { rolLog: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Rol Log\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }


  // -------------------------KANAL AYARLAMA------------------------//
  
  
  // -------------------------ROL AYARLAMA------------------------//
  if(args[0] === "banhammer") {
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { banHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Ban Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "jailhammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { jailHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Jail Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "mutehammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { muteHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Mute Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "vmutehammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { vmuteHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Mute Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "clownhammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { clownHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Clown Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "movehammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { moveHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Move Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "registerhammer") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { registerHammer: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Register Hammer\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "viprol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { vipRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Vip Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "erkekrol") {
    let roller;
    if(message.mentions.roles.size >= 1)
    roller = message.mentions.roles.map(role => role.id);
    else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
    if(roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { erkek: roller } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Erkek Rolü\` rolü config dosyasına ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "yonetimrolleri") {
    let roller;
    if(message.mentions.roles.size >= 1)
    roller = message.mentions.roles.map(role => role.id);
    else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
    if(roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yonetimRoles: roller } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yönetim Rolleri\` rolü config dosyasına ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "kadınrol") {
    let roller;
    if(message.mentions.roles.size >= 1)
    roller = message.mentions.roles.map(role => role.id);
    else roller = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
    if(roller.length <= 0) return message.reply(`Bir rol belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { kadın: roller } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Kadın Rolü\` rolü config dosyasına ${roller.map(role => message.guild.roles.cache.filter(role2 => role == role2.id).map(role => role.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "kayıtsızrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { kayıtsızRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Kayıtsız Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "tagrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { tagRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Taglı Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "muterol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { mutedRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Muted Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "vmuterol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { vmutedRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`VMuted Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "cezalırol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cezalıRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Cezalı Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "boosterrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { boosterRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Booster Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "etkinlikrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { etkinlikRole: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Booster Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "cekilisrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cekilisRole: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Booster Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "vbronz") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { vBronz: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Bronz\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === " vgumus") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: {  vGumus: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Gumus\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "valtin") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: {  vAltin: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Altın\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "velmas") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { vElmas: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Voice Elmas\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "cbronz") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cbronz: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`chatbronz\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "cgumus") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cGumus: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Chat Gumus\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "caltın") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { caltın: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Chat Altın\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "celmas") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { cElmas: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Chat Elmas\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "basvurucezali") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { basvuruCezali: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Başvuru Cezalı\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "yetkilialimdm") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yetkiliAlımDM: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yetkili Alım Dm\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "enaltyetki") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { enAltYetki: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`En Alt Yetkili\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "yenihesaprol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yeniHesapRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yeni Hesap Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "ytagrol") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yasakTagRol: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yasaklı Tag Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  // -------------------------ROL AYARLAMA------------------------//
  
  // -------------------------KATEGORİ AYARLAMA------------------------//
  if(args[0] === "basvurukat") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0])
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { basvuruKategori: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Başvuru Kategorisi\` config dosyasına ${channel} olarak ayarlandı!`)
  }
  
  if(args[0] === "publickat") {
    let kanallar;
    if(message.mentions.channels.size >= 1)
    kanallar = message.mentions.channels.map(kanal => kanal.id);
    else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id));
    if(kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { publicParents: kanallar } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Public Kategorileri\` config dosyasına ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "registerkat") {
    let kanallar;
    if(message.mentions.channels.size >= 1)
    kanallar = message.mentions.channels.map(kanal => kanal.id);
    else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id));
    if(kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { regParents: kanallar } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Register Kategorileri\` config dosyasına ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "privatekat") {
    let kanallar;
    if(message.mentions.channels.size >= 1)
    kanallar = message.mentions.channels.map(kanal => kanal.id);
    else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id));
    if(kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { privateParents: kanallar } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Private Kategorileri\` config dosyasına ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarlandı!`)
  }
  if(args[0] === "oyunkat") {
    let kanallar;
    if(message.mentions.channels.size >= 1)
    kanallar = message.mentions.channels.map(kanal => kanal.id);
    else kanallar = args.splice(1).filter(kanal => message.guild.channels.cache.some(kanal2 => kanal == kanal2.id));
    if(kanallar.length <= 0) return message.reply(`Bir kanal belirtmelisin.`);    
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { gameParents: kanallar } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Oyun Kategorileri\` config dosyasına ${kanallar.map(kanal => message.guild.channels.cache.filter(kanal2 => kanal == kanal2.id).map(kanal => kanal.toString())).join(", ")} olarak ayarlandı!`)
  }
  
  // -------------------------KATEGORİ AYARLAMA------------------------//
  
  
  // -------------------------ROL ALMA AYARLAMA------------------------//
  if(args[0] === "kirmizirenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { kirmiziRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Kırmızı Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "turuncurenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { turuncuRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Turuncu Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "mavirenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { maviRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Mavi Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "lilarenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { lilaRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Lila Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "morrenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { morRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Mor Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "pemberenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { pembeRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Pembe Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "yesilrenk") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yesilRenk: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yeşil Renk Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "sevgilimvar") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { couple: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Sevgilim Var Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "sevgilimyok") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { alone: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Sevgilim Yok Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "koc") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { koc: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Koç Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "boga") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { boga: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Boğa Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "ikizler") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { ikizler: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`İkizler Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "yengec") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yengec: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yengeç Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "aslan") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { aslan: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Aslan Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "basak") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { basak: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Başak Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "terazi") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { terazi: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Terazi Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "akrep") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { akrep: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Akrep Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "yay") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { yay: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Yay Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "oglak") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { oglak: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Oğlak Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "kova") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { kova: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Kova Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  if(args[0] === "balik") {
    let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
    if(!rol) return message.reply(`Bir rol belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { balik: rol.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Balık Burcu Rolü\` rolü config dosyasına ${rol} olarak ayarlandı!`)
  }
  
  if(args[0] === "rolalmakanal") {
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.reply(`Bir kanal belirtmelisin.`)
    await sunucuVeri.findOneAndUpdate({ guildID: client.guilds.cache.get(ayarlar.guildID) }, { $set: { rolAlmaKanal: channel.id } }, { upsert: true }).exec();
    message.reply(`Başarılı bir şekilde \`Rol Alma\` kanalı config dosyasına ${channel} olarak ayarlandı!`)
  }
  
  // -------------------------ROL ALMA AYARLAMA------------------------//
  
  
  
  
  
      } 
  
exports.config = {
    name: "relly",
    usage: `${ayarlar.BotPrefix}relly`,
    guildOnly: true,
    aliases: ["relly"],
    cooldown: 3000
};
