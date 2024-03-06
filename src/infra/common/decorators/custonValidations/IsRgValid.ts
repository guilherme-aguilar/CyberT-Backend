import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
class IsRgValidConstraint implements ValidatorConstraintInterface {
  validate(rg: string, _args: ValidationArguments) {
    // Exemplo de expressão regular para um formato de RG fictício (ajuste conforme necessário)
    const rgFormatoValido = /^\d{2}\.\d{3}\.\d{3}(-\d{1})?$/;

    return rgFormatoValido.test(rg);
  }
}

export function IsRgValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {message: validationOptions && validationOptions.message ? validationOptions.message : "RG inválido" },
      constraints: [],
      validator: IsRgValidConstraint,
    });
  };
}
