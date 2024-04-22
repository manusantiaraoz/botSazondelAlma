

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
  
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");





const flowOperador = addKeyword(["5"])
.addAnswer([
      "*en unos momentos un operador respondera tu mensaje! gracias por elegirnos*"
  ],
  null,
  null,
  []

);
const flowMenu = addKeyword(["4"])
.addAnswer(
  [
    "*nos caracterizamos por nuestra gran variedad de productos*",
    "pasa por nuestra web y observa todo lo que tenemos para ofrecerte",
    "https://sazondelalma-restaurant73i.netlify.app/menu",
  ]).addAnswer([
      "*para volver al menu principal enviar *volver o princial*"
  ],
  null,
  null,
  []

);
const flowEquipo = addKeyword(["2"])
.addAnswer(
  [
    "*horarios:*  ",
    "*Lunes a Sábados: 08:00 - 00:00*",
    "*Domingos: 08:00 - 13:00*",
    "comunicate para reservas al: +54 012 345 6789",
    "nuestra ubicación: https://www.google.com/maps/place/RollingCode+School/@-26.836583,-65.207167,16z/data=!4m6!3m5!1s0x94225d3ad7f30f1d:0xf8606cd659b8e3e4!8m2!3d-26.8365833!4d-65.207167!16s%2Fg%2F11h0b4kn08?hl=es-419&entry=ttu"
  ]).addAnswer([
      "*para volver al menu principal enviar *volver o princial*"
  ],
  null,
  null,
  []

);
const flowinformacion = addKeyword(["equipo","3"])
.addAnswer(
  "*jefe general: Sheyla Astorga*", {media: 'https://media.licdn.com/dms/image/D4D03AQGKDOqOpH8LOQ/profile-displayphoto-shrink_800_800/0/1712006237515?e=1718841600&v=beta&t=Rrzr_sbNSnSp_5FT5pzhmBEFwrdVSzaHENoydJtajNY',}
).addAnswer(
  "*Encargado de cocina: javier Exequiel jimenez*", {media: 'https://media.licdn.com/dms/image/D4E03AQGP_2UUBO40-w/profile-displayphoto-shrink_200_200/0/1669678199075?e=1718841600&v=beta&t=4dEOoCp9pb2u6hvWBTQP9ekCF0ixebxts0_oGWg0Gs8',}
).addAnswer(
  "*chef residente: Thiago Benjamin Fiol* ", {media: 'https://media.licdn.com/dms/image/D4D22AQHVovZXDeemJg/feedshare-shrink_800/0/1713156946906?e=1715817600&v=beta&t=AMMOBLtbXlh9Y0ULpojjnspKh6q-t1bjnVAniupFwd0',}
).addAnswer(
  "*chef invitado: Natalia Morales*", {media: 'https://media.licdn.com/dms/image/C4D03AQHnPbm_FXo9Vg/profile-displayphoto-shrink_200_200/0/1635622751474?e=1718841600&v=beta&t=GiQJ-zrnpQ24_AQ3CBL8rYDQw6Y5K_3xJqyrDFW52P8',}
).addAnswer(
  "*Seguridad: Daniel Emmanuel Santi Araoz*", {media: 'https://media.licdn.com/dms/image/D4D03AQF0U8CVevSpGg/profile-displayphoto-shrink_200_200/0/1713151905873?e=1718841600&v=beta&t=VQpcI3jTjssZkMej1kpYeU3J9663uEf0jZcO8ey0Cvc',}
).addAnswer(
  [
    "*para volver al menu principal enviar *volver o princial*",
    ],
  null,
  null,
  [ ]
  );


  const flowOfertas = addKeyword(['1'])
  .addAnswer([
    "opciones de Menu"
  ])
  .addAnswer(
    [
      "menu infantil: hamburguesa con papas fritas o patitas de pollos con ensalada a *$5000*",
      "menu ejecutivo: bife de lomo con papas fritas/españolas/pure/arroz *$7000*",
      "menu ejecutivo: matambre al verdeo con papas fritas/españolas/pure/arroz *$7000*",
      "menu vegano: Lentejas con arroz y calabaza y 1 hamburguesa not burger. *8000*",
      "mas opciones en nuestra web: https://sazondelalma-restaurant73i.netlify.app/menu",
      "*para volver al menu anterior enviar volver o princial*"
    ],
    null,
    null,
    [ ]
    );




  // const opcionNoValida = addKeyword(EVENTS.WELCOME)
  // .addAnswer(["😯*lo siento, la opcion ingresada no es valida*"],{capture:true})
  // .addAnswer(
  //   [
  //     "envia alguna de las siguientes",
  //     "👉 envia *1* para ver nuestros menu en oferta",
  //     "👉 envia *2* para informacion de nuestros horarios y dirección",
  //     "👉 envia *3*  información sobre nuestro equipo de profesionales",
  //     "👉 envia *4*  para ver nuestro menu completo",
      
  //   ],
  //   null,
  //   null,
  //   [flowOfertas, flowinformacion, flowEquipo]
  // );

    
    const flowPrincipal = addKeyword(['hola','hol','hoal', 'principal', 'volver','volve' ])
    .addAnswer("✨ hola, un gusto saludarte, bienvenido a sazón del Alma")
    .addAnswer(
      [
        "opciones",
        "👉 envia *1* para ver nuestros menu en oferta",
        "👉 envia *2* para informacion de nuestros horarios y dirección",
        "👉 envia *3*  información sobre nuestro equipo de profesionales",
        "👉 envia *4*  para ver nuestro menu completo",
        "👉 envia *5*  para chatear con un operador",
        
      ],
      null,
      null,
      [flowOfertas, flowinformacion, flowEquipo, flowMenu,flowOperador]
    );
  

const main = async () => {

  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);
  
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });




  QRPortalWeb();
};

main();
