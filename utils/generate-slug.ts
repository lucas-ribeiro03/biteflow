export const generateSlug = (string: string) => {
  const random = Math.floor(Math.random() * (Date.now() * 1000));
  return (
    string
      .normalize("NFD") // Decompõe caracteres acentuados (ex: 'á' vira 'a' + '´')
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos (os sinais diacríticos)
      .replace(/ç/gi, "c") // Transforma 'ç' ou 'Ç' em 'c'
      .replace(/\s+/g, "-") // Substitui um ou mais espaços por '-'
      .toLowerCase() + random
  ); // Opcional: transforma tudo em minúsculo
};
