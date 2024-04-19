import { BasicConfiguraction } from '@app/models/basicConfig';
import { basicConfiguration as rawToPrisma } from '@prisma/client';

export class BasicConfigMapper {
  static toPrisma(raw: BasicConfiguraction) {
    return {
      urlCentralCliente: raw.urlCentralCliente,
      urlMinhaConexao: raw.urlMinhaConexao,
      urlSpeedTest: raw.urlSpeedTest,
      urlFacebook: raw.urlFacebook,
      urlInstagram: raw.urlInstagram,
      urlWhatsapp: raw.urlWhatsapp,
      emailAtendimento: raw.emailAtendimento,
      emailComercial: raw.emailComercial,
      telefonePrincipal: raw.telefonePrincipal,
      urlLocalizacao: raw.urlLocalizacao
    };
  }

  static toDomain(raw: rawToPrisma): BasicConfiguraction {
    return new BasicConfiguraction({
      urlCentralCliente: raw.urlCentralCliente,
      urlMinhaConexao: raw.urlMinhaConexao,
      urlSpeedTest: raw.urlSpeedTest,
      urlFacebook: raw.urlFacebook,
      urlInstagram: raw.urlInstagram,
      urlWhatsapp: raw.urlWhatsapp,
      emailAtendimento: raw.emailAtendimento,
      emailComercial: raw.emailComercial,
      telefonePrincipal: raw.telefonePrincipal,
      urlLocalizacao: raw.urlLocalizacao
    });
  }
}
