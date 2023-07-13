export const onlyLettersRegex = /^[a-zA-Z]+$/;
export const onlyLettersAndDashesAndSpacesRegex = /^[a-zA-Z]+[a-zA-Z\-]*[^\-]*$/;
export const startsWithLetterWhichContainsLetterAndNumbersRegex = /^[a-zA-Z]+[a-zA-Z0-9]*$/;
export const startsWithNumberWhichContainsLetterOrNumberRegex = /^[0-9][A-Z0-9]+$/;
export const startsWithLetterWhichContainsLettersAndSpacesAndApostrophesAndCannotEndWithSpacesApostrophesDashes =
  /^(?!.*[-']$)(?!.*[-'][ -'])(?!.*[ -'][-'])[a-zA-ZÀ-ÖØ-öø-ÿ][-'aa-zA-ZÀ-ÖØ-öø-ÿ ]*$/;
export const reportStatusRegex = /^(ouvert|en cours|ferme)$/;
export const statusRegex = /^(actif|banni|inactif)$/;
