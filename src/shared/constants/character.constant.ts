import Valery from '@animations/Valery.json';
import Chucho from '@animations/Chucho.json';
import Alex from '@animations/Alex.json';
import Beto from '@animations/Beto.json';

import { QuestionCharacter } from '@enums/Question.enum';

export const characters: { [key in QuestionCharacter]: any } = {
	[QuestionCharacter.BETO]: Beto,
	[QuestionCharacter.VALERY]: Valery,
	[QuestionCharacter.CHUCHO]: Chucho,
	[QuestionCharacter.ALEX]: Alex
};
