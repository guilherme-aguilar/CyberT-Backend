import { IsNotEmpty, Matches, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsZipCodeValidConstraint implements ValidatorConstraintInterface {
  validate(cep: string, _args: ValidationArguments) {
    // Exemplo de expressão regular para um formato de CEP brasileiro (ajuste conforme necessário)
    const cepFormatoValido = /^\d{5}-?\d{3}$/;

    return cepFormatoValido.test(cep);
  }
}

export function IsZipCodeValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {message: validationOptions && validationOptions.message ? validationOptions.message : "CEP inválido" },
      constraints: [],
      validator: IsZipCodeValidConstraint,
    });
  };
}