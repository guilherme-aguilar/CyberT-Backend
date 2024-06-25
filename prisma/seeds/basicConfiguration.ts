export async function createBasicConfiguration(prisma) {
  console.log(process.env)
  await prisma.basicConfiguration.create({
    data: {
      emailAtendimento: process.env.EMAIL_ATENDIMENTO,
      emailComercial: process.env.EMAIL_COMERCIAL,
      telefonePrincipal: process.env.TELEFONE_PRINCIPAL,
      urlFacebook: process.env.URL_FACEBOOK,
      urlInstagram: process.env.URL_INSTAGRAM,
      urlLocalizacao: process.env.URL_LOCALIZACAO,
      urlMinhaConexao: process.env.URL_MINHA_CONEXAO,
      urlSpeedTest: process.env.URL_SPEED_TEST,
      urlWhatsapp: process.env.URL_WHATSAPP,
      urlCentralCliente: process.env.URL_CENTRAL_CLIENTE,
      multipleCitys: false
    }
  });
}
