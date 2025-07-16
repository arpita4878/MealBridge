import passwordGenerator from 'generate-password';

const generatePassword = () => {
  return passwordGenerator.generate({
    length: 8,       
    numbers: true,
    symbols: true,
    strict: true
  });
};

export default generatePassword;
