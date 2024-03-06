import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, _args: ValidationArguments) {

      // Check if cpf is defined and is a string
  if (typeof cpf !== 'string') {
    return false;  // or handle the error in an appropriate way
  }
  
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Calcular os dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    return resto === parseInt(cpf.charAt(10));
  }
}

export function IsCpfValid(validationOptions? : ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {message: validationOptions && validationOptions.message ? validationOptions.message : "CPF inválido" },
      constraints: [],
      validator: IsCpfValidConstraint,
    });
  };
}
